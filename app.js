const express = require ("express")
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const showsRouter = require("./routes/shows")
const usersRouter=  require("./routes/users")
const reviewsRouter=  require("./routes/reviews")
const methodOverride = require("method-override")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")
const flash = require("connect-flash");
const helmet = require("helmet");
const ExpressError = require("./errors/ExpressError")


const connectMongoose = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/showsApp');
        console.log("Conectado!");
    } catch(e){
        console.log(e);
        console.log("Ops, algo deu errado...");
    }
}

connectMongoose();
mongoose.connection.on("error", err=>{
    console.log(err);
    console.log("Conexão perdida!");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionConfig = {
    secret:"password",
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000 * 60 *60 * 24 * 7
        // secure: true ----------  pesquisar depois
    }
}

app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error" );
    res.locals.currentUser = req.user;
    next()
})
app.use("/shows", showsRouter);
app.use("/shows", reviewsRouter);
app.use("/", usersRouter)




app.all("*", (req,res,next)=>{
    next(new ExpressError("Não encontramos o que você buscava", 404))
  })

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Ops... Algo deu errado!"
    res.status(statusCode).render("error", {err})
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});

