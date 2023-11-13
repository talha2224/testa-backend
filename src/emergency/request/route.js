const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const { requestForEmergency, getByServiceProvider, getByPatient, getAllForAdmin, getSingle } = require('./service')

router.post('/request',asyncErrorHandler(async(req,res)=>{
    let {serviceProviderId,patientId,location,destination,tripType,estimateCost} = req.body
    let result = await requestForEmergency(serviceProviderId,patientId,location,destination,tripType,estimateCost)
    res.send(result)
}))

router.get('/provider/:serviceId',asyncErrorHandler(async(req,res)=>{
    let {serviceId} = req.params
    let result = await getByServiceProvider(serviceId)
    res.send(result)
}))

router.get('/patient/:patientId',asyncErrorHandler(async(req,res)=>{
    let {patientId} = req.params
    let result = await getByPatient(patientId)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await getAllForAdmin()
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let id = req.params.id
    let result = await getSingle(id)
    res.send(result)
}))


module.exports = router