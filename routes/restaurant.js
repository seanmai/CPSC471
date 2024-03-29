var express = require("express");
var router = express.Router();
var db = require('../db.js');
var middleware = require("../middleware");

router.get("/", (req, res) => {
    let restaurants = {};
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("restaurant/index", {restaurants : restaurants});
    });
});

router.get("/admin", (req, res) => {
    let restaurants = {};
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("restaurant/admin/index", {restaurants : restaurants});
    });
});

router.get("/:id/admin", (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE Rstrnt_id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let restaurant = result[0];
        res.render("restaurant/admin/show", {restaurant : restaurant});
    });
});

router.get("/:id/edit", (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE Rstrnt_id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let restaurant = result[0];
        res.render("restaurant/admin/edit", {restaurant : restaurant});
    });
});

router.get("/:id", (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE Rstrnt_id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let restaurant = result[0];
        res.render("restaurant/show", {restaurant : restaurant});
    });
});

router.put("/:id", (req, res) => {
    let sql = `UPDATE RESTAURANT SET Name=?, Location=?, Avg_rate=? WHERE Rstrnt_id=${req.params.id}`;
    db.query(sql, [req.body.name, req.body.location, req.body.rate], (err, result) => {
        if(err) throw err;
        res.redirect("/restaurants/admin");
    });
});

router.delete("/:id", function(req, res) {
    let sql = `DELETE FROM RESTAURANT WHERE Rstrnt_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect("/restaurants/admin");
    });
});

router.get("/:id/menu", (req, res) => {
    let menu = {};

    let sql = `SELECT I.* \
               FROM ITEM as I, RESTAURANT as R \
               WHERE I.Rstrnt_id = R.Rstrnt_id AND R.Rstrnt_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        menu = result;
        res.render("restaurant/menu", {menu : menu});
    });
});

router.get("/:id/reservations", middleware.isLoggedIn, (req, res) => {
    let reservations = {};
    // Query all reservations from the current date and onwards
    let sql = `SELECT V.* FROM RESERVATION as V, RESTAURANT as R \
               WHERE V.Rstrnt_id = R.Rstrnt_id AND R.Rstrnt_id =${req.params.id} AND V.Date >= NOW()`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("restaurant/reservation", {reservations : reservations, restaurantId : req.params.id});
    });
});

router.post("/:id/reservations", (req, res) => {
    let reservation = {
        Rstrnt_id: req.params.id,
        Guest_count: req.body.guestCount,
        Date: req.body.reservationDate,
        Cust_id: req.user.user_id
    }

    let sql = 'INSERT INTO RESERVATION SET ?';
    db.query(sql, reservation, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.redirect(`/restaurants/${req.params.id}`);
    });
});

router.delete("/:id/reservations/:rsrvID", (req, res) => {
    let sql = `DELETE FROM RESERVATION WHERE Res_id = ${req.params.rsrvID}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("restaurant/reservation", {reservations : reservations});
    });
});

router.get("/:id/employee", (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE Rstrnt_id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let restaurant = result[0];
        res.render("restaurant/employee/show", {restaurant : restaurant});
    });
});

router.get("/:id/employee/orders", (req, res) => {
    let sql = `SELECT O.*,C.Quantity,I.Name as Item_name,U.username as Customer_name \
               FROM ORDERS as O, CONSIST_OF as C, ITEM as I, USER as U \
               WHERE O.Rstrnt_id=${req.params.id} AND C.Order_id=O.Order_id AND C.Item_id=I.Item_id AND U.user_id=O.Customer_id \
               ORDER BY Order_id`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        orders = result;
        // console.log(result);
        res.render("restaurant/employee/orders", {orders : orders});
    });
});

router.get("/:id/employee/reservations", (req, res) => {
    let sql = `SELECT R.*,U.username as Customer_name \
               FROM RESERVATION as R, USER as U \
               WHERE R.Rstrnt_id=${req.params.id} AND U.user_id=R.Cust_id \
               ORDER BY Date DESC`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        // console.log(result);
        res.render("restaurant/employee/reservations", {reservations : reservations});
    });
});


module.exports = router;

//ELECT O.*,C.Quantity,I.Name,U.username FROM ORDERS as O, CONSIST_OF as C, ITEM as I, USER as U WHERE O.Rstrnt_id=1 AND C.Order_id=O.Order_id AND C.Item_id=I.Item_id AND U.user_id=O.Customer_id ORDER BY Order_id;
// SELECT O.*,C.Quantity,I.Name as Item_name,U.username as Customer_name FROM ORDERS as O, CONSIST_OF as C, ITEM as I, USER as U WHERE O.Rstrnt_id=${req.params.id} AND C.Order_id=O.Order_id AND C.Item_id=I.Item_id AND U.user_id=O.Customer_id ORDER BY Order_id;

// SELECT R.*,U.username as Customer_name FROM RESERVATION as R, USER as U WHERE R.Rstrnt_id=1 AND U.user_id=R.Cust_id ORDER BY Date DESC;