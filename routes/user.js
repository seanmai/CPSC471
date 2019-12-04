var express = require("express");
var router = express.Router();
var passport = require("passport");
var db = require('../db.js');

router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/restaurants', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
}), (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/restaurants');
});

module.exports = router;