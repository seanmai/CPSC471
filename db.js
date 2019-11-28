var mysql = require("mysql");

// Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    insecureAuth : true,
    // Comment the below line out when no db is created yet.
    database : 'restaurant471'
});

// Connect to db
db.connect((err) => {
    if(err) throw err;
    console.log('MySql connection established.')
});

module.exports = db;