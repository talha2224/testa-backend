const router = require('express').Router()
const { asyncErrorHandler } = require("../../public/middleware/Error/Handler");
const {multerStorage} = require('../../public/configuration/multer.config');
const { RegisterHospital, LogiHospital, Updatehospital, AllHospital, SingleHospital, getPatientReportsForHospitals } = require('./service');

router.post('/register',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    let {firstname,lastname,email,phone,password,address,country} = req.body 
    let orignalname = req?.file?.orignalname
    let buffer = req?.file?.buffer
    let result = await RegisterHospital(firstname,lastname,email,phone,password,address,country,orignalname,buffer)
    res.send(result)
}))

router.post('/login',asyncErrorHandler(async(req,res)=>{
    let {email,password} = req.body 
    let result = await LogiHospital(email,password)
    res.send(result)

}))

router.put('/update/:id',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    let {firstname,lastname,phone,address,country } = req.body 
    let {id} = req.params
    let orignalname = req?.file?.orignalname
    let buffer = req?.file?.buffer
    let result = await Updatehospital(id,firstname,lastname,phone,address,country,orignalname,buffer)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await AllHospital()
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await SingleHospital(id)
    res.send(result)
}))

router.get('/patients/report',asyncErrorHandler(async(req,res)=>{
    let result = await getPatientReportsForHospitals()
    res.send(result)
}))
module.exports = router