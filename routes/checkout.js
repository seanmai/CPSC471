var express = require("express");
var router = express.Router();
var db = require('../db.js');
var Cart = require("../models/cart");

router.get("/add-to-cart/:id", (req, res) => {
    let food = {};
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    let sql = `SELECT * \
               FROM FOOD \
               WHERE Food_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        food = result[0];
        cart.add(food, food.Food_id);
        req.session.cart = cart;
        console.log(cart);
        console.log(food);
        res.redirect('back');
    });
});

module.exports = router;