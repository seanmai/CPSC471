var express        = require("express"),
    // socket         = require("socket.io"),
    bodyParser     = require("body-parser"),
    app            = express(),
    db = require('./db');
    // createDB       = require("./createdb"),
    // seedDB         = require("./seeddb");

app.set("view engine", "ejs");

// Uncomment this line to create the database only.
// createDB();
// Uncomment this line to create AND seed the database.
// seedDB();


// Requiring Routes
var indexRoutes = require("./routes/index"),
    restaurantRoutes = require("./routes/restaurant"),
    menuRoutes = require("./routes/menu"),
    ordersRoutes = require("./routes/orders"),
    userRoutes = require("./routes/user"),
    checkoutRoutes = require("./routes/checkout");

// app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
// app.use("/menu", menuRoutes);
// app.use("/orders", ordersRoutes);
// app.use("/user", userRoutes);
// app.use("/checkout", checkoutRoutes);
// // Redirects all other routes that are not specified
// app.all("*", function(req, res){
//     res.redirect("http://localhost:3000");
// });


var port = 3000;
var server = app.listen(port, function(){
    console.log("Listening on PORT" + port);
});

function createDB() {
    let sql = 'DROP DATABASE IF EXISTS restaurant471';
    runSQL(sql);

    sql = 'CREATE DATABASE restaurant471';
    runSQL(sql);

    console.log("Database created.");
}

function seedDB() {
    // Dropping all tables
    let sql = 'DROP DATABASE IF EXISTS restaurant471';
    runSQL(sql);
    
    sql = 'CREATE DATABASE restaurant471';
    runSQL(sql);

    // Seeding table
    sql = [ 'CREATE TABLE RESTAURANT ( Rstrnt_id varchar(255) AUTO_INCREMENT NOT NULL, Name varchar(255) NOT NULL, Location varchar(255) NOT NULL, Avg_rate int, Owner_id varchar(255) NOT NULL, PRIMARY KEY (Rstrnt_id), FOREIGN KEY (Owner_id) REFERENCES OWNER(User_id) )', 
            'CREATE TABLE RESERVATION (Res_id varchar(255) AUTO_INCREMENT NOT NULL, Rstrnt_id varchar(255) NOT NULL, Guest_count int NOT NULL, Date Date NOT NULL, Cust_id varchar(255) NOT NULL, PRIMARY KEY (Res_id), FOREIGN KEY (Cust_id) REFERENCES CUSTOMER(User_id), FOREIGN KEY (Rstrnt_id) REFERENCES Restaurant(Rstrnt_id) )'
          ];
    sql.forEach((statement) => {
        runSQL(statement);
    })

    // sql = insert stuff into those tables here
}

function runSQL(sql) {
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
}

function runSQL(sql, post) {
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
}

/*

show databases;
use <database>;
show tables;

*/