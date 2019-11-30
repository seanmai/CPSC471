var db = require('./db.js');

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
    // Turn off foreign key checks to create tables 
    sql = 'SET FOREIGN_KEY_CHECKS = 0';
    runSQL(sql);

    // Seeding table
    sql = [ 'CREATE TABLE RESTAURANT ( Rstrnt_id int AUTO_INCREMENT NOT NULL, Name varchar(255) NOT NULL, Location varchar(255) NOT NULL, Avg_rate int, Owner_id int NOT NULL, PRIMARY KEY (Rstrnt_id), FOREIGN KEY (Owner_id) REFERENCES OWNER(User_id) )', 
            'CREATE TABLE RESERVATION ( Res_id int AUTO_INCREMENT NOT NULL, Rstrnt_id int NOT NULL, Guest_count int NOT NULL, Date Date NOT NULL, Cust_id int NOT NULL, PRIMARY KEY (Res_id), FOREIGN KEY (Cust_id) REFERENCES CUSTOMER(User_id), FOREIGN KEY (Rstrnt_id) REFERENCES Restaurant(Rstrnt_id) )',
            // 'CREATE TABLE TABLE ( Rstrnt_id int NOT NULL, Table_no varchar(255) NOT NULL, Capacity int NOT NULL, Res_id varchar(255) NOT NULL, PRIMARY KEY (Rstrnt_id,Table_no), FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT (Rstrnt_id),FOREIGN KEY (Res_id) REFERENCES RESERVATION(Res_id) )',
            'CREATE TABLE CUSTOMER ( User_id int NOT NULL, Name varchar(255) NOT NULL, Phone varchar(20) NOT NULL,PRIMARY KEY (User_id) )'
          ];
    sql.forEach((statement) => {
        runSQL(statement);
    });

    sql = [ 'INSERT INTO RESTAURANT (Name, Location, Avg_rate, Owner_id) VALUES ("Seans Pub", "1234 4th St Calgary, AB", 12, 1)',
            'INSERT INTO RESTAURANT (Name, Location, Avg_rate, Owner_id) VALUES ("Boba", "123 3rd St Calgary, AB", 15, 2)',
          ];
        
    sql.forEach((statement) => {
    runSQL(statement);
    });

    // Turn foreign key checks back on
    sql = 'SET FOREIGN_KEY_CHECKS = 1';
    runSQL(sql);
}

module.exports = seedDB;


/*

let restaurant = some json
let sql = INSERT INTO restaurant ?
let query = db.query(sql, restaurant, (err) etc.)

*/