const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
 
 const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique:true
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  shows:[
    { // filmes adicionados na lista
    type: mongoose.Schema.Types.ObjectId,
    ref:"Show"
  }
]
 
  
 });

 UserSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User", UserSchema);



  