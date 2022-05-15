const Show = require( "../models/show");
const User = require("../models/user")
const axios = require("axios")
const Review = require("../models/review")

module.exports.createReview = async (req,res)=>{
    const showId  = req.params.showId
   
    let show =  await Show.findOne({showApiId: showId})
    if(!show){
      const showData =  await axios.get(`https://api.tvmaze.com/shows/${showId}`)
      const showName =  showData.data.name; /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY SHOWS NO USER SCHEMA
      const averageRating =  showData.data.rating.average ; /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY SHOWS NO USER SCHEMA
      const summary =  showData.data.summary ;
      const imageUrl = showData.data.image.medium;  /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY SHOWS NO USER SCHEMA
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
    res.redirect(`/shows/${showId}`)
  }

  module.exports.deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params
    const show = await Show.findById(id)
    
    await Show.findByIdAndUpdate(id, {$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("error", "Crítica apagada")
    res.redirect(`/shows/${show.showApiId}`)
}

module.exports.renderEditReview = async(req,res)=>{
    const {reviewId} = req.params
    const review = await Review.findById(reviewId).populate("author").populate("show")
    
    res.render("../views/editReview", {review})
  }

module.exports.editReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    const show = await Show.findById(id);
    await Review.findByIdAndUpdate(reviewId,{...req.body.review})
    req.flash("success", "Crítica editada!")
    res.redirect(`/shows/${show.showApiId}`)
  
  
  
  }