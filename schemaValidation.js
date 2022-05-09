const Joi = require("joi");
 //const movieSchema = Joi.object({   
   // movie: Joi.object({   // este "movie" ta aqui porque lá nos formulario, o atributo "name" vai estar assim: name="movie[movieName]"
     //   movieName: Joi.string().alphanum().escapeHTML().required(),
       // rating: Joi.number().min(1).max(5).required()
   // }).required()
    
// });
// module.exports = movieSchema;
 
 const userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().min(5).max(30).alphanum().escapeHTML().required(),
        email:Joi.string().alphanum().escapeHTML().required()
    }).required()
 })
 module.exports = userSchema;
 
 const reviewSchema = Joi.object({
  review: Joi.object({
    reviewText: Joi.string().alphanum().escapeHTML().required(),
  rating:Joi.number().required()
  })
})