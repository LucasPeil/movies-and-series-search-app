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
    show:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Show"
    }
})

module.exports = mongoose.model("Review",reviewSchema );