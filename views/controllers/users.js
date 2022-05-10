const User = require("../models/user")

module.exports.renderLogin = (req, res)=>{
    res.render("../views/user/login")
}
module.exports.login = (req,res)=>{
    //console.log(req.user._id)
    const goToUrl = req.session.returnTo || "/movies" ;
    delete req.session.returnTo;
    res.redirect(goToUrl);
}
module.exports.renderRegister = (req,res)=>{
    res.render("../views/user/register");
}
module.exports.register = async (req,res)=>{
    try{
    const {username, email, password} = req.body.user
    const user = new User({username,email})
    const registeredUser = await User.register(user,password)
    req.login(registeredUser, err=>{
        if (err) return next(err);
        req.flash("success", "Bem-indo!")
        res.redirect("/movies")
    })
    } catch(e){
        req.flash("error", e.message)
        res.redirect("/register")
    }
}
module.exports.logout = (req,res)=>{
    req.logout();
    req.flash()
    
    res.redirect("/movies")
}