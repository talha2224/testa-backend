const router = require('express').Router()
const {asyncErrorHandler} = require('../../../public/middleware/Error/Handler')
const { postPrescription, getByPatientId, getByDoctorId, getSingle, updatePrescription } = require('./service')
const authorized = require('../../../public/middleware/Jwt/Auth')

router.post('/create',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId,doctorId,prescription,condition,date}= req.body
    let result = await postPrescription(patientId,doctorId,prescription,condition,date)
    res.send(result)
}))

router.get('/patient/:patientId',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId}= req.params
    let result = await getByPatientId(patientId)
    res.send(result)
}))

router.get('/doctor/:doctorId',authorized,asyncErrorHandler(async(req,res)=>{
    let {doctorId}= req.params
    let result = await getByDoctorId(doctorId)
    res.send(result)
}))

router.get('/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id}= req.params
    let result = await getSingle(id)
    res.send(result)
}))

router.put('/update/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {prescription,condition,date}= req.body
    let {id}= req.params
    let result = await updatePrescription(id,prescription,condition,date)
    res.send(result)
}))

module.exports = router