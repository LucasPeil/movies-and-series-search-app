const BasicJoi = require("joi");
const sanitizeHtml = require("sanitize-html")



const Joi = BasicJoi.extend((joi) => ({
  type: "string",
  base: joi.string(),
  messages:{
    'string.escapeHTML': '{{#label}} não deve incluir HTML!'
  },
  rules:{
    escapeHTML:{
      validate(value,helpers){
        const clean = sanitizeHtml(value,{
          allowedTags:[],
          allowedAttributes:{},
        })
        if(clean !== value) return helpers.error('string.escapeHTML', {value})
        return clean
      }
    }
  }
}))

module.exports.userSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().required().escapeHTML(),
        email:Joi.string().escapeHTML().required(),
        password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')).escapeHTML().required()
    }).required()
 })
 
 
 module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    reviewText: Joi.string().escapeHTML().required(),
    rating:Joi.number().required().min(1)
  })
})



