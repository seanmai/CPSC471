var express = require("express");
var router = express.Router();
var db = require('../db.js');

router.get("/", (req, res) => {
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
    let restaurants = {};
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("restaurant/index", {restaurants : restaurants});
    })
});

router.get("/:id/reservations", (req, res) => {
    let restaurants = {};
    // Reservations from today and onwards except reservations from today and onwards that are reserved
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("restaurant/index", {restaurants : restaurants});
    })
});

module.exports = router;