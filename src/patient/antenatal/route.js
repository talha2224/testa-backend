const router = require('express').Router()
const {asyncErrorHandler} = require('../../../public/middleware/Error/Handler')
const { HireDoctor, getForPatient, getForDoctor, appointmentBooking, approvedAppoinment, getAllAppoinment, getSingleAppoinment } = require('./service')
const { appoinmentDateValidation } = require('./validation')
const authorized = require('../../../public/middleware/Jwt/Auth')



router.post('/hire/doctor',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId,doctorId,pregnancyMonth} = req.body
    let result = await HireDoctor(patientId,doctorId,pregnancyMonth)
    res.send(result)
}))

// ALL PATIENT GET FOR DOCTOR
router.get('/doctor/:doctorId',authorized,asyncErrorHandler(async(req,res)=>{
    let {doctorId} = req.params
    let result = await getForDoctor(doctorId)
    res.send(result)
}))

// APPOINTED DOCTOR GET
router.get('/patient/:patientId',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId} = req.params
    let result = await getForPatient(patientId)
    res.send(result)
}))

// TAKE APPOINMENT
router.put('/appoinment/:id',authorized,appoinmentDateValidation,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {date,hour,minute,ampm} = req.body
    let result = await appointmentBooking(id,date,hour,minute,ampm)
    res.send(result)
}))

// APPROVED APPOINMENT
router.put('/accept/appoinment/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {approved} = req.body
    let result = await approvedAppoinment(id,approved)
    res.send(result)
}))

// ALL APPOINEMTN
router.get('/appoinment/all/:doctorId',authorized,asyncErrorHandler(async(req,res)=>{
    let {doctorId} = req.params
    let result = await getAllAppoinment(doctorId)
    res.send(result)
}))

router.get('/appoinment/single/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await getSingleAppoinment(id)
    res.send(result)
}))

module.exports = router