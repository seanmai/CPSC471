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
    })
});

module.exports = router;