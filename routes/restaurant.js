var express = require("express");
var router = express.Router();
var db = require('../db.js');

router.get("/", (req, res) => {
    console.log(req.user);
    let restaurants = {};
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("restaurant/index", {restaurants : restaurants});
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

router.get("/:id/reservations", (req, res) => {
    let reservations = {};

    // Query all reservations from the current date and onwards
    let sql = `SELECT V.* FROM RESERVATION as V, RESTAURANT as R \
                WHERE V.Rstrnt_id = R.Rstrnt_id AND R.Rstrnt_id =${req.params.id} AND V.Date >= NOW()`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("restaurant/reservation", {reservations : reservations});
    });
});

router.post("/:id/reservations", (req, res) => {
    let sql = 'INSERT INTO RESERVATION VALUES (( \
               SELECT Rstrnt_id FROM RESTAURANT WHERE Rstrnt_id = <id>), ‘<guest_count>’, ‘<date>’, ( \
               SELECT User_id FROM CUSTOMER WHERE User_id = <id>))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("restaurant/reservation", {reservations : reservations});
    });
});

router.delete("/:id/reservations/rsrvID", (req, res) => {
    let sql = `DELETE FROM RESERVATION WHERE Res_id = ${req.params.rsrvID}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("restaurant/reservation", {reservations : reservations});
    });
});

router.get("/:id/orders", (req, res) => {

});


module.exports = router;