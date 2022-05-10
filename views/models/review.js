const mongoose = require("mongoose")

const reviewSchema =  new mongoose.Schema({
    rating:{
        type: Number
    },
    reviewText:{
        type: String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    }
})

module.exports = mongoose.model("Review",reviewSchema );