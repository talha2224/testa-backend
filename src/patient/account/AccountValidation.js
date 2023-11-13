const joi = require('joi');

const registerValidation =(req,res,next)=>{
    
    let validation = joi.object({}).keys({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        gender:joi.string().required(),
        longitude:joi.number().required(),
        latitude:joi.number().required()
    })
    let {error} = validation.validate(req.body,{abortEarly:false})
    if (error){
        res.status(409).json(error.message)
    }
    else{
        next()
    }
}

module.exports = {registerValidation}