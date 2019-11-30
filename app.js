var express        = require("express"),
    // socket         = require("socket.io"),
    bodyParser     = require("body-parser"),
    app            = express(),
    db             = require('./db'),
    createDB       = require("./createdb"),
    seedDB         = require("./seeddb");

app.set("view engine", "ejs");

// Uncomment this line to create the database only.
// createDB();
// Uncomment this line to seed the database.
seedDB();


// Requiring Routes
var indexRoutes = require("./routes/index"),
    restaurantRoutes = require("./routes/restaurant"),
    reservationRoutes = require("./routes/reservation"),
    ordersRoutes = require("./routes/orders"),
    userRoutes = require("./routes/user"),
    checkoutRoutes = require("./routes/checkout");

// app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
// app.use("/reservation", reservationRoutes);
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

/*

show databases;
use <database>;
show tables;

*/