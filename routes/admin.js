var express = require("express");
var router = express.Router();
var db = require('../db.js');

router.get("/restaurants", (req, res) => {
    let restaurants = {};
    let sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        restaurants = result;
        res.render("admin/restaurant", {restaurants : restaurants});
    });
});


module.exports = router;
