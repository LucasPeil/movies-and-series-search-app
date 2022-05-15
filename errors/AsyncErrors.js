module.exports = func =>{
    return (req,res,next) =>{
      func(req,res,next).catch(next) // passa o next para ir para o proximo middleware
    }
  }