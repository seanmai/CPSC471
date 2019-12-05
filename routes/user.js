var express = require("express");
var router = express.Router();
var passport = require("passport");
var db = require('../db.js');
var middleware = require("../middleware");

router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/restaurants', // redirect to the secure profile section
    failureRedirect : '/user/login', // redirect back to the signup page if there is an error
}), (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/restaurants');
});

router.get("/signup", (req, res) => {
    res.render("user/signup");
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/restaurants', // redirect to the secure profile section
    failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/restaurants');
});

router.get('/:id/orders', function(req, res) {
    let sql = `SELECT O.*,R.Name FROM ORDERS as O, Restaurant as R WHERE Customer_id=${req.params.id} AND O.Rstrnt_id=R.Rstrnt_id`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let orders = result;
        res.render("user/orders", {orders : orders});
    });
});

router.get('/:id/reservations', function(req, res) {
    let sql = `SELECT V.*,R.Name FROM RESERVATION as V, Restaurant as R WHERE V.Cust_id=${req.params.id} AND V.Rstrnt_id=R.Rstrnt_id`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        let reservations = result;
        res.render("user/reservations", {reservations : reservations});
    });
});

module.exports = router;

