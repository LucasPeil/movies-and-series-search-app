
const Show = require("./models/show")
const Review = require("./models/review")

const ExpressError = require('./errors/ExpressError');
const {userSchema, reviewSchema} = require("./schemaValidation")
const catchAsync = require("./errors/AsyncErrors")


module.exports.isLoggedIn = (req,res, next)=>{
    if(!req.isAuthenticated()){
        const id = req.params.id
        req.session.returnTo = req.originalUrl.replace("add", "")
        req.flash("error", "Voce precisa estar logado para completar esta ação!")
        return res.redirect("/login")
    }
    next()
}

module.exports.validateReview = (req,res,next)=>{
    const {showId} = req.params
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        req.flash("error", "Sua critica deve conter pelo menos 1 estrela e algum comentário ")
        res.redirect(`/shows/${showId}`)
        
    }else{
        next()
    }
}

module.exports.validateEditReview = async (req,res,next)=>{
    const {showId,reviewId} = req.params
    console.log(showId)
    const show = await Show.findById(showId)
    
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        req.flash("error", "Sua critica deve conter pelo menos 1 estrela e algum comentário ")
        res.redirect(`/shows/${reviewId}/edit`)
        
    }else{
        next()
    }
}

module.exports.validateUser = (req,res,next)=>{
    const {showId} = req.params
    const {error} = userSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        req.flash("error","Sua senha deve conter pelo menos um número, uma letra maiusculas e um caracter especial!")
        console.log(error)
        res.redirect("/register")
        
    }else{
        next()
    }
}




module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Você não tem permissão para fazer isso!');
        return res.redirect(`/shows`);
    }
    next();
}


