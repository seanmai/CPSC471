var express = require("express");
var router = express.Router();
var db = require('../db.js');
var Cart = require("../models/cart");

router.get("/", function(req, res){
    if(!req.session.cart){
        return res.render("checkout/index", {items: null});
    }
    var cart = new Cart(req.session.cart);
    res.render("checkout/index", {items: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get("/add-to-cart/:id", (req, res) => {
    let food = {};
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    let sql = `SELECT * \
               FROM ITEM \
               WHERE Item_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        food = result[0];
        cart.add(food, food.Item_id);
        req.session.cart = cart;
        console.log(cart);
        console.log(food);
        res.redirect('back');
    });
});

router.get("/cart-remove/:id", function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/checkout");
});

router.post("/", function(req, res){
    if(!req.session.cart){
        return res.redirect("/checkout");
    }
    var cart = new Cart(req.session.cart);
    if(!req.user){
        var user = {};
    } else {
        var user = {
            id: req.user.user_id,
            username: req.user.username
        };
    }

    let order = {
        Pay_method: req.body.paymentOption,
        Date: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        Address: req.body.address,
        // Pickup_time: req.body.pickup_time,
        Order_type: req.body.order_type,
        Customer_id: req.user.user_id,
        Rstrnt_id: cart.rstrntId, 
    }
    
    let sql = 'INSERT INTO ORDERS SET ?';
    db.query(sql, order, (err, result) => {
        if(err) throw err;
        console.log(result);
        req.session.cart = {};
        res.redirect("/restaurants");
    });


});

module.exports = router;