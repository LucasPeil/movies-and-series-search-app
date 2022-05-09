const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../errors/AsyncErrors');

const user = require('../controllers/users');


router.route("/login")
.get(user.renderLogin)
.post(passport.authenticate("local",  { failureMessage: true, failureRedirect: '/login' }), user.login)

router.route("/register")
.get(user.renderRegister)
.post(catchAsync(user.register))

router.route("/logout").get(user.logout)

module.exports = router;



//const express = require("express");

//const router = express.Router();
/*
const User = require("../models/user")
const passport = require("passport")

router.get("/login", (req, res)=>{
    res.render("../views/user/login")
})
router.post("/login", passport.authenticate("local", {failureMessage: true , failureRedirect:"/login"}),(req,res)=>{
    //console.log(req.user._id)
    res.redirect("/movies")
})
    

router.get("/register", (req,res)=>{
    res.render("../views/user/register");
})
router.post("/register", async (req,res)=>{
    try{
    const {username, email, password} = req.body.user
    const user = new User({username,email})
    const registeredUser = await User.register(user,password)
    req.login(registeredUser, err=>{
        if (err) return next(err);
        console.log(`registrado como ${username}`) 
        res.redirect("/movies")
    })
    } catch(e){
        console.log("Algo deu errado");
        res.redirect("/register")
    }
})

router.get("/logout", (req,res)=>{
    req.logout();
    
    res.redirect("/movies")
})

module.exports = router;
*/