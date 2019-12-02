var express = require("express");
var router = express.Router();
var db = require('../db.js');

router.get("/", (req, res) => {
    // Query all reservations from the current date and onwards
    let sql = 'SELECT V.* FROM RESERVATION as V, RESTAURANT as R WHERE V.Rstrnt_id = R.Rstrnt_id AND Date >= ‘<today>’';
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("reservation/index", {reservations : reservations});
    });
});

router.post("/", (req, res) => {
    let sql = 'INSERT INTO RESERVATION VALUES (( \
               SELECT Rstrnt_id FROM RESTAURANT WHERE Rstrnt_id = <id>), ‘<guest_count>’, ‘<date>’, ( \
               SELECT User_id FROM CUSTOMER WHERE User_id = <id>))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("reservation/index", {reservations : reservations});
    });
});

router.delete("/:id", (req, res) => {
    let sql = 'DELETE FROM RESERVATION WHERE Res_id = <id>';
    db.query(sql, (err, result) => {
        if(err) throw err;
        reservations = result;
        res.render("reservation/index", {reservations : reservations});
    });
});

module.exports = router;