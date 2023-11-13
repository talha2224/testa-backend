const joi = require('joi');

const accountValidation = (req,res,next)=>{
    let validation = joi.object({}).keys({
        firstname:joi.string().required(),
        lastname:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        phone:joi.number().required(),
        country:joi.string().required(),
        specialization:joi.string().required()
    })
    let {error} = validation.validate(req.body,{abortEarly:false})
    if (error){
        res.status(409).json(error.message)
    }
    else{
        next()
    }
}

module.exports = {accountValidation}