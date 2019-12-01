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
    sql = [ 'CREATE TABLE RESTAURANT ( \
                Rstrnt_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Location varchar(255) NOT NULL, \
                Avg_rate int, \
                Owner_id int NOT NULL, \
                PRIMARY KEY (Rstrnt_id), \
                FOREIGN KEY (Owner_id) REFERENCES OWNER(Owner_id) )', 
            'CREATE TABLE RESERVATION ( \
                Res_id int AUTO_INCREMENT NOT NULL, \
                Rstrnt_id int NOT NULL, \
                Guest_count int NOT NULL, \
                Date Date NOT NULL, \
                Cust_id int NOT NULL, \
                PRIMARY KEY (Res_id), \
                FOREIGN KEY (Cust_id) REFERENCES CUSTOMER(Customer_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES Restaurant(Rstrnt_id) )',
            'CREATE TABLE TABLES ( \
                Rstrnt_id int NOT NULL, \
                Table_no varchar(255) NOT NULL, \
                Capacity int NOT NULL, \
                Res_id int NOT NULL, \
                PRIMARY KEY (Rstrnt_id,Table_no), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT(Rstrnt_id), \
                FOREIGN KEY (Res_id) REFERENCES RESERVATION(Res_id) )',
            'CREATE TABLE CUSTOMER ( \
                Customer_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Phone varchar(20) NOT NULL, \
                PRIMARY KEY (Customer_id) )',
            'CREATE TABLE ADMIN ( \
                Admin_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Phone varchar(20) NOT NULL, \
                PRIMARY KEY (Admin_id) )', // I changed User_id into Admin_id
            'CREATE TABLE HELPS ( \
                Helps_id int AUTO_INCREMENT NOT NULL, \
                Admin_id int NOT NULL, \
                Customer_id int NOT NULL, \
                PRIMARY KEY (Helps_id), \
                FOREIGN KEY (Admin_id) REFERENCES ADMIN(Admin_id), \
                FOREIGN KEY (Customer_id) REFERENCES CUSTOMER(Customer_id) )',
            'CREATE TABLE OWNER ( \
                Owner_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Phone varchar(20) NOT NULL, \
                PRIMARY KEY (Owner_id) )',
            'CREATE TABLE EMPLOYEE ( \
                Employee_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Phone varchar(20) NOT NULL, \
                Employer_id int NOT NULL, \
                Rstrnt_id int NOT NULL, \
                PRIMARY KEY (Employee_id), \
                FOREIGN KEY (Employer_id) REFERENCES OWNER(Owner_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT(Rstrnt_id) )',
            'CREATE TABLE FOOD ( \
                Food_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Description varchar(255), \
                Price int NOT NULL, \
                Quantity int NOT NULL, \
                Rstrnt_id int NOT NULL, \
                PRIMARY KEY (Food_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT (Rstrnt_id) )',
            'CREATE TABLE FOOD_INGREDIENTS ( \
                Food_id int NOT NULL, \
                Food_ingredients varchar(255) NOT NULL, \
                PRIMARY KEY (Food_id,Food_ingredients), \
                FOREIGN KEY (Food_id) REFERENCES Food (Food_id) )',
            'CREATE TABLE DRINK ( \
                Drink_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Description varchar(255), \
                Quantity int NOT NULL, \
                Type varchar(255), \
                Rstrnt_id int NOT NULL, \
                PRIMARY KEY (Drink_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT (Rstrnt_id) )',
            'CREATE TABLE ORDERS ( \
                Order_id int AUTO_INCREMENT NOT NULL, \
                Pay_method varchar(20) NOT NULL, \
                Date date NOT NULL, \
                Address varchar(255), \
                Pickup_time time, \
                Order_type varchar(255), \
                Customer_id int NOT NULL, \
                Rstrnt_id int NOT NULL, \
                PRIMARY KEY (Order_id), \
                FOREIGN KEY (Customer_id) REFERENCES CUSTOMER(Customer_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT(Rstrnt_id) )',
            'CREATE TABLE CONSIST_OF_FOOD ( \
                Order_id int NOT NULL, \
                Food_id int NOT NULL, \
                PRIMARY KEY (Order_id,Food_id), \
                FOREIGN KEY (Order_id) REFERENCES ORDERS(Order_id), \
                FOREIGN KEY (Food_id) REFERENCES FOOD(Food_id) )',
            'CREATE TABLE CONSIST_OF_DRINK ( \
                Order_id int NOT NULL, \
                Drink_id int NOT NULL, \
                PRIMARY KEY (Order_id,Drink_id), \
                FOREIGN KEY (Order_id) REFERENCES ORDERS(Order_id), \
                FOREIGN KEY (Drink_id) REFERENCES DRINK(Drink_id) )',
            'CREATE TABLE MENU ( \
                Menu_id int AUTO_INCREMENT NOT NULL, \
                Name varchar(255) NOT NULL, \
                Meals_type varchar(30), \
                Rstrnt_id int NOT NULL, \
                PRIMARY KEY (Menu_id), \
                FOREIGN KEY (Rstrnt_id) REFERENCES RESTAURANT(Rstrnt_id) )',
            'CREATE TABLE COMPRISES_OF_FOOD ( \
                Menu_id int NOT NULL, \
                Food_id int NOT NULL, \
                PRIMARY KEY (Menu_id,Food_id), \
                FOREIGN KEY (Menu_id) REFERENCES MENU(Menu_id), \
                FOREIGN KEY (Food_id) REFERENCES FOOD(Food_id) )',
            'CREATE TABLE COMPRISES_OF_DRINK ( \
                Menu_id int NOT NULL, \
                Drink_id int NOT NULL, \
                PRIMARY KEY (Menu_id,Drink_id), \
                FOREIGN KEY (Menu_id) REFERENCES MENU(Menu_id), \
                FOREIGN KEY (Drink_id) REFERENCES DRINK(Drink_id) )',
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