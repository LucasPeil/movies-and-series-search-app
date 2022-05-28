const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  showName:{
    type: String,
    required: true
  },
  showApiId:{
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


module.exports= mongoose.model("Show", ShowSchema);