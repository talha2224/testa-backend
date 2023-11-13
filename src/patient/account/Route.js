const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const { createAccount, otpVerification, accountApproval, loginAccount, updatePatientProfile, getSinglePatient } = require('./Service');
const { multerStorage } = require('../../../public/configuration/multer.config');
const { registerValidation } = require('./AccountValidation');
const { generateSecretKey } = require('../../../public/functions/uniqueKey');
const {generateRandomNumber} = require('../../../public/functions/randomNumber')
const authorized = require('../../../public/middleware/Jwt/Auth')



const key = generateSecretKey() //UNIQUE KEY GENERATOR FOR EACH USER FUNCTION
// const otp = generateRandomNumber()//RANDOM 4 DIGITS OTP GENERATOR FUNCTION

router.post('/register',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{

    let {name,email,password,gender,longitude,latitude,number1,number2} = req.body   
    let convertedGender = gender.toLowerCase() 
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let AccountCreated = await createAccount(name,email,password,key,otp,convertedGender,originalname,buffer,longitude,latitude,number1,number2)
    res.send(AccountCreated)
}))

router.put('/verify/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {otp} = req.body
    let otpResponse = await otpVerification(otp,id)
    res.send(otpResponse)
}))

router.put('/approved/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {isApproved} = req.body
    let result = await accountApproval(id,isApproved)
    res.send(result)
}))

router.post('/login',asyncErrorHandler(async(req,res)=>{

    let {email,password}= req.body
    let result = await loginAccount(email,password)
    res.send(result)
}))


router.put('/update/:id',authorized,multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    let {id} = req?.params
    let {name,longitude,latitude,hideReports,number1,number2} = req.body   
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let result = await updatePatientProfile(id,name,longitude,latitude,hideReports,originalname,buffer,number1,number2)
    res.send(result)
}))


router.get('/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req?.params
    let result = await getSinglePatient(id)
    res.send(result)
}))




module.exports = router

