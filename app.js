var express        = require("express"),
    mysql          = require("mysql"),
//      socket         = require("socket.io"),
    bodyParser     = require("body-parser"),
    app            = express();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root1234',
    database : 'restaurant'
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