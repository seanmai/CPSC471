var express        = require("express"),
    bodyParser     = require("body-parser"),
    cookieParser   = require("cookie-parser"),
    session        = require("express-session"),
    passport       = require("passport"),
    methodOverride = require("method-override"),
    app            = express(),
    db             = require('./db'),
    createDB       = require("./createdb"),
    seedDB         = require("./seeddb");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    next();
});

// Uncomment this line to create the database only.
// createDB(); 
// Uncomment this line to seed the database.
// seedDB();

// Requiring Routes
var indexRoutes = require("./routes/index"),
    restaurantRoutes = require("./routes/restaurant"),
    userRoutes = require("./routes/user"),
    checkoutRoutes = require("./routes/checkout");

app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/user", userRoutes);
// Redirects all other routes that are not specified
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