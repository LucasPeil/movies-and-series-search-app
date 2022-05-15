const Show = require( "../models/show");
const User = require("../models/user");
const axios = require("axios");
module.exports.index = (req, res)=>{
     
    res.render("../views/index");
   }

module.exports.addShowList = async(req,res)=>{ 
    const {showId} =  req.params; 
    const user = await User.findById(req.user._id).populate("shows");
    const savedShow = user.shows.some(show => show.showApiId == showId)
    if(savedShow){
      req.flash("error","Este filme já está na sua lista!" )
      res.redirect(req.originalUrl.replace("add", ""));
    }else{
    const showData = await axios.get(`https://api.tvmaze.com/shows/${showId}`)         
    const showFounded = await Show.findOne({showApiId: showData.data.id});
    const showName =  showData.data.name; 
    const averageRating =  showData.data.rating.average ; 
    const summary =  showData.data.summary ;
    const imageUrl = showData.data.image.medium;  
    const showApiId = showData.data.id;
   
    if(showFounded){
      user.shows.push(showFounded);
      await user.save();
    }else{
     //  DAR UM VALOR PADRÃO PARA ESSAS VARIAVES, CASO CONTRÁRIO O APP QUEBRA!!!!!! *********
    const newShow = new Show({showName,showApiId,averageRating,summary,imageUrl}); 
    user.shows.push(newShow);
    await newShow.save();
    await user.save();
    }
  
        req.flash("success","Filme adicionado na sua lista" )
        res.redirect("/shows/list");
  }
}

module.exports.renderShowList = async(req, res)=>{
    const user = await User.findById(req.user._id).populate({
      path:"shows",
      populate:{
        path:"review"
      }
    });
    
  res.render("../views/showList", {user});
}

module.exports.showDetails = async (req,res)=>{
    const {id} =  req.params;
  
    const foundShow = await Show.findOne({showApiId:id}).populate({
      path:"review",
      populate :{
        path : "author",
        }
    })
    
    if(!foundShow){
      const show = await axios.get(`https://api.tvmaze.com/shows/${id}`);
       res.render("../views/show", {show});
    }else{
  
    res.render("../views/review",{foundShow});
    }
      
  }

  module.exports.deleteShowOnList = async(req, res)=>{
    const showId = req.params.showId;
    const userId = req.user._id;
    const user = await User.findById(req.user._id);
    const foundShow = user.shows.find( show=>{
    return show._id == showId;
 
  })
  const index = user.shows.indexOf(foundShow);
  user.shows.splice(index,1)
  await user.save();
  req.flash("success", "Removido da sua lista")
  res.redirect("/shows/list");
}

