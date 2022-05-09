const Movie = require( "../models/movie");
const User = require("../models/user")
const axios = require("axios")
const Review = require("../models/review")

module.exports.createReview = async (req,res)=>{
    const movieId  = req.params.movieId
   
    let movie =  await Movie.findOne({movieApiId: movieId})
    if(!movie){
      const movieData =  await axios.get(`https://api.tvmaze.com/shows/${movieId}`)
      const movieName =  movieData.data.name; /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY MOVIES NO USER SCHEMA
      const averageRating =  movieData.data.rating.average ; /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY MOVIES NO USER SCHEMA
      const summary =  movieData.data.summary ;
      const imageUrl = movieData.data.image.medium;  /// AS VARIAVEIS TEM DE TER O MESMO NOME DOS CAMPOS DO ARRAY MOVIES NO USER SCHEMA
      const movieApiId = movieData.data.id
      movie = new Movie({movieName,movieApiId,averageRating,summary,imageUrl})
      }
  
    const {rating,reviewText} = req.body.review
    const newReview = new Review({rating, reviewText})
    
    movie.review.push(newReview)
    newReview.author = req.user._id 
    newReview.movie = movie._id
    await movie.save()
    await newReview.save()
    req.flash("success", "Crítica realizada com sucesso")
    res.redirect(`/movies/${movieId}`)
  }

  module.exports.deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params
    const movie = await Movie.findById(id)
    
    await Movie.findByIdAndUpdate(id, {$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("error", "Crítica apagada")
    res.redirect(`/movies/${movie.movieApiId}`)
}

module.exports.renderEditReview = async(req,res)=>{
    const {reviewId} = req.params
    const review = await Review.findById(reviewId)
    
    res.render("../views/editReview")
  }

module.exports.editReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    const movie = await Movie.findById(id);
    await Review.findByIdAndUpdate(id,{...req.body.review})
    res.redirect(`/movies/${movie.movieApiId}`)
  
  
  
  }