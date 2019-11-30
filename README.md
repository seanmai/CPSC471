# CPSC471
----

To run this program, run `node app.js` in the project directory.

----
## Setup
1. Download NodeJS and MySQL
2. Clone this repository and ensure the MySQL credentials match those in the configuration. Look for this in the db.js file
```javascript
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    insecureAuth : true,
    // Comment the below line out when no db is created yet.
    database : 'restaurant471'
});
```
3. Create a database by commenting out the above line `database : 'restaurant471'` and then uncommenting the `createDB()` function in app.js. Run the server once with the `node app.js` command in the command line when in this project directory.
4. Stop the server. Comment back out `createDB()` and uncomment `database : 'restaurant471'` from the database connection and `seedDB()` app.js to seed the database with initial data. You can comment this line back out and begin coding. 
