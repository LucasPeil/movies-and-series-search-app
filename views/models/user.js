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
  movies:[
    { // filmes adicionados na lista
    type: mongoose.Schema.Types.ObjectId,
    ref:"Movie"
  }
]
 
  
 });

 UserSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User", UserSchema);



  