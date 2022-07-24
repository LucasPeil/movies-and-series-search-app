const Show = require( "../models/show");
const User = require("../models/user")
const axios = require("axios")
const Review = require("../models/review")

module.exports.createReview = async (req,res)=>{
    const showId  = req.params.showId
   
    let show =  await Show.findOne({showApiId: showId})
    if(!show){
      const showData =  await axios.get(`https://api.tvmaze.com/shows/${showId}`)
      const showName =  showData.data.name;
      const averageRating =  showData.data.rating.average ; 
      const summary =  showData.data.summary ;
      const imageUrl = showData.data.image.medium;
      const showApiId = showData.data.id
      show = new Show({showName,showApiId,averageRating,summary,imageUrl})
      }
  
    const {rating,reviewText} = req.body.review
    const newReview = new Review({rating, reviewText})
    
    show.review.push(newReview)
    newReview.author = req.user._id 
    newReview.show = show._id
    await show.save()
    await newReview.save()
    req.flash("success", "Crítica realizada com sucesso")
    res.redirect(`/${showId}`)
  }

  module.exports.deleteReview = async(req,res)=>{
    const {showId, reviewId} = req.params
    const show = await Show.findById(showId)
    
    await Show.findByIdAndUpdate(showId, {$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("error", "Crítica apagada")
    res.redirect(`/${show.showApiId}`)
}

module.exports.renderEditReview = async(req,res)=>{
    const {reviewId} = req.params
    const review = await Review.findById(reviewId).populate("author").populate("show")
    
    res.render("../views/editReview", {review})
  }

module.exports.editReview = async(req,res)=>{
    const {showId, reviewId} = req.params;
    const show = await Show.findById(showId);
    await Review.findByIdAndUpdate(reviewId,{...req.body.review})
    req.flash("success", "Crítica editada!")
    res.redirect(`/${show.showApiId}`)
  
  
  
  }