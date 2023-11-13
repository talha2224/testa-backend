const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const { multerStorage } = require('../../../public/configuration/multer.config')
const { LoginEmergencyAccount, RegisterEmergency, AllServiceProvider, SingleServiceProvider, UpdateEmergencyServiceProvider } = require('./service')


router.post('/register',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let {name,email,phone,password,address,avalabilityFrom,availabilityTill,country,esitimateCost} = req.body
    let result = await RegisterEmergency(name,email,phone,password,address,avalabilityFrom,availabilityTill,country,originalname,buffer,esitimateCost)
    res.send(result)
}))

router.post('/login',asyncErrorHandler(async(req,res)=>{
    let {email,password} = req.body
    let result = await LoginEmergencyAccount(email,password)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await AllServiceProvider()
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let id = req.params.id
    let result = await SingleServiceProvider(id)
    res.send(result)
}))

router.put('/update/:id',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    let id = req.params.id
    let {name,phone,address,avalabilityFrom,availabilityTill,country,esitimateCost} = req.body
    let result = await UpdateEmergencyServiceProvider(id,name,phone,address,avalabilityFrom,availabilityTill,country,originalname,buffer,esitimateCost)
    res.send(result)
}))

module.exports = router