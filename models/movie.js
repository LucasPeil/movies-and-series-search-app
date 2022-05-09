const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const MovieSchema = new mongoose.Schema({
  movieName:{
    type: String,
    required: true
  },
  movieApiId:{
    type: String,
    required: true
  },
  averageRating:{
    type: Number
    
  },
  imageUrl:{
    type: String,
    required:true
  },
  summary:{
    type: String,
    required:true
  }, 
  review:[ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    } 
  ]
});


module.exports= mongoose.model("Movie", MovieSchema);