const router = require('express').Router()
const { asyncErrorHandler } = require("../../../public/middleware/Error/Handler");
const {multerStorage} = require('../../../public/configuration/multer.config');
const { bookTest, approvedTest, getForLaboratry, getSingle, getForAdmin, sendTestResult, adminApprovedResult, getScreeningTestResult, getSingleScreeningTestResult, getForPatient } = require('./service');
const authorized = require('../../../public/middleware/Jwt/Auth')


// SCREENING 
router.post('/send/request',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId,laboratryId,fromHome,testCategory,date,time1,time2,ampm}=req.body
    let result = await bookTest(patientId,laboratryId,fromHome,testCategory,date,time1,time2,ampm)
    res.send(result)
}))

router.put('/approved/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {approved} = req.body
    let result = await approvedTest(id,approved)
    res.send(result)
}))

router.get('/laboratry/:labId',authorized,asyncErrorHandler(async(req,res)=>{
    let {labId} = req.params
    let result = await getForLaboratry(labId)
    res.send(result)
}))

router.get('/patient/history/:patientId',asyncErrorHandler(async(req,res)=>{
    let {patientId} = req.params
    let result = await getForPatient(patientId)
    res.send(result)
}))

router.get('/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await getSingle(id)
    res.send(result)
}))

router.get('/admin/all',authorized,asyncErrorHandler(async(req,res)=>{
    let result = await getForAdmin()
    res.send(result)
}))


// SCREENING TEST RESULT
router.post('/test/result',authorized,multerStorage.array('documents',10),asyncErrorHandler(async(req,res)=>{
    let {screeningId,patientId,laboratryId} = req.body
    let documents= req?.files
    let result = await sendTestResult(screeningId,documents,patientId,laboratryId)
    res.send(result)
}))

router.get('/test/result',authorized,asyncErrorHandler(async(req,res)=>{
    let result = await getScreeningTestResult()
    res.send(result)
}))

router.get('/test/result/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await getSingleScreeningTestResult(id)
    res.send(result)
}))

// SEND AFTER APPROVAL
router.put('/approved/result/:resultId',authorized,asyncErrorHandler(async(req,res)=>{
    let {resultId} = req.params
    let {approved} =req.body
    let result = await adminApprovedResult(resultId,approved)
    res.send(result)
}))


module.exports = router