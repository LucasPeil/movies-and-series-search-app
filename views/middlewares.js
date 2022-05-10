const Movie = require( "./models/movie");
const User = require("./models/user")
const Review = require("./models/review")


module.exports.isLoggedIn = (req,res, next)=>{
    if(!req.isAuthenticated()){
        const id = req.params.id
        req.session.returnTo = req.originalUrl.replace("add", "")
        req.flash("error", "Voce precisa estar logado para completar esta ação!")
        return res.redirect("/login")
    }
    next()
}

/*module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!Review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}*/


module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Você não tem permissão para fazer isso!');
        return res.redirect(`/movies`);
    }
    next();
}


