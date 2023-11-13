const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const { multerStorage } = require('../../../public/configuration/multer.config')
const { registerDoctor, loginDoctor, getAllDoctor, getSingelDoctor, getBySpecialization, updateDoctorProfile } = require('./service')
let {accountValidation} = require('./validation')


router.post('/register',multerStorage.single('image'),accountValidation,asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let {firstname,lastname,email,password,specialization,phone,country} = req.body
    let result = await registerDoctor(firstname,lastname,email,password,specialization,phone,country,originalname,buffer)
    res.send(result)
}))

router.post('/login',asyncErrorHandler(async(req,res)=>{
    let {email,password} = req.body
    let result = await loginDoctor(email,password)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await getAllDoctor()
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let id = req.params.id
    let result = await getSingelDoctor(id)
    res.send(result)
}))

router.get('/specialization/:specialization',asyncErrorHandler(async(req,res)=>{
    let specialization = req.params.specialization
    let result = await getBySpecialization(specialization)
    res.send(result)
}))

router.put('/update/:id',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let id = req.params.id
    let {firstname,lastname,phone,country,specialization} = req.body
    let result = await updateDoctorProfile(id,firstname,lastname,specialization,phone,country,originalname,buffer)
    res.send(result)
}))

module.exports = router