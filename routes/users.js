const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../errors/AsyncErrors');
const {validateUser} = require("../middlewares")
const user = require('../controllers/users');


router.route("/login")
.get(user.renderLogin)
.post(passport.authenticate("local",  { failureFlash: true, failureRedirect: '/login' }), user.login)

router.route("/register")
.get(user.renderRegister)
.post(validateUser, catchAsync(user.register))

router.route("/logout").get(user.logout)

module.exports = router;



