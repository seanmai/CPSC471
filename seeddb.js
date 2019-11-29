var db = require('../db.js');

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

module.exports = seedDB;