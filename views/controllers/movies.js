const Movie = require( "../models/movie");
const User = require("../models/user");
const axios = require("axios");
module.exports.index = (req, res)=>{
     
    res.render("../views/index");
   }

module.exports.addShowList = async(req,res)=>{ 
    const {movieId} =  req.params; 
    const user = await User.findById(req.user._id).populate("movies");
    const savedMovie = user.movies.some(movie => movie.movieApiId == movieId)
    if(savedMovie){
      req.flash("error","Este filme já está na sua lista!" )
      res.redirect(req.originalUrl.replace("add", ""));
    }else{
    const movieData = await axios.get(`https://api.tvmaze.com/shows/${movieId}`)         
    const movieFounded = await Movie.findOne({movieApiId: movieData.data.id});
    const movieName =  movieData.data.name; 
    const averageRating =  movieData.data.rating.average ; 
    const summary =  movieData.data.summary ;
    const imageUrl = movieData.data.image.medium;  
    const movieApiId = movieData.data.id;
   
    if(movieFounded){
      user.movies.push(movieFounded);
      await user.save();
    }else{
     //  DAR UM VALOR PADRÃO PARA ESSAS VARIAVES, CASO CONTRÁRIO O APP QUEBRA!!!!!! *********
    const newMovie = new Movie({movieName,movieApiId,averageRating,summary,imageUrl}); 
    user.movies.push(newMovie);
    await newMovie.save();
    await user.save();
    }
  
        req.flash("success","Filme adicionado na sua lista" )
        res.redirect("/movies/list");
  }
}

module.exports.renderShowList = async(req, res)=>{
    const user = await User.findById(req.user._id).populate({
      path:"movies",
      populate:{
        path:"review"
      }
    });
    
  res.render("../views/movieList", {user});
}

module.exports.showDetails = async (req,res)=>{
    const {id} =  req.params;
  
    const foundMovie = await Movie.findOne({movieApiId:id}).populate({
      path:"review",
      populate :{
        path : "author",
        }
    })
    
    if(!foundMovie){
      const movie = await axios.get(`https://api.tvmaze.com/shows/${id}`);
       res.render("../views/show", {movie});
    }else{
  
    res.render("../views/review",{foundMovie});
    }
      
  }

  module.exports.deleteShowOnList = async(req, res)=>{
    const movieId = req.params.movieId;
    const userId = req.user._id;
    const user = await User.findById(req.user._id);
    const foundMovie = user.movies.find( movie=>{
    return movie._id == movieId;
 
  })
  const index = user.movies.indexOf(foundMovie);
  user.movies.splice(index,1)
  await user.save();
  req.flash("success", "Removido da sua lista")
  res.redirect("/movies/list");
}

