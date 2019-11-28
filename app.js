var express        = require("express"),
    mysql          = require("mysql"),
    // socket         = require("socket.io"),
    bodyParser     = require("body-parser"),
    app            = express();
    // createDB       = require("./createdb"),
    // seedDB         = require("./seeddb");

// Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root1234',
    database : 'restaurant471'
});

// Connect to db
db.connect((err) => {
    if(err) throw err;
    console.log('MySql connection established.')
});

// Uncomment this line to create the database only.
// createDB();
// Uncomment this line to create AND seed the database.
// seedDB();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE restaurant471';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('db created');
    });
});

/*
// Requiring Routes
var indexRoutes = require("./routes/index"),
    menuRoutes = require("./routes/menu"),
    ordersRoutes = require("./routes/orders"),
    userRoutes = require("./routes/user"),
    checkoutRoutes = require("./routes/checkout");

app.use("/", indexRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);
app.use("/checkout", checkoutRoutes);
// Redirects all other routes that are not specified
app.all("*", function(req, res){
    res.redirect("http://localhost:3000");
});
*/

var port = 3000;
var server = app.listen(port, function(){
    console.log("Listening on PORT" + port);
});

function createDB() {
    let sql = 'CREATE DATABASE restaurant471';
    runSQL(sql);
}

function seedDB() {
    // Dropping all tables
    let sql = 'DROP DATABASE restaurant471';
    runSQL(sql);
    
    sql = 'CREATE DATABASE restaurant471';
    runSQL(sql);

    // Seeding table
    sql = [ {'CREATE TABLE RESTAURANT ( Rstrnt_id varchar(255) NOT NULL, Name varchar(255) NOT NULL, Location varchar(255) NOT NULL, Avg_rate int, Owner_id varchar(255) NOT NULL, PRIMARY KEY (Rstrnt_id), FOREIGN KEY (Owner_id) REFERENCES OWNER(User_id) )'}, 
            {'CREATE TABLE RESERVATION (Res_id varchar(255) NOT NULL, Rstrnt_id varchar(255) NOT NULL, Guest_count int NOT NULL, Date Date NOT NULL, Cust_id varchar(255) NOT NULL, PRIMARY KEY (Res_id), FOREIGN KEY (Cust_id) REFERENCES CUSTOMER(User_id), FOREIGN KEY (Rstrnt_id) REFERENCES Restaurant(Rstrnt_id) )'}
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

/*

show databases;
use <database>;
show tables;

*/