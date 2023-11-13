const router = require ('express').Router()
const { multerStorage } = require('../../public/configuration/multer.config')
const { asyncErrorHandler } = require('../../public/middleware/Error/Handler')
const { createChat, patientChat, doctorChat, sendMessage, getMessage } = require('./service')
const authorized = require('../../public/middleware/Jwt/Auth')

router.post('/create',authorized,asyncErrorHandler(async(req,res)=>{
    let {doctorId,patientId} = req.body
    let result = await createChat(doctorId,patientId)
    res.send(result)
}))

// GET PATIENT CHAT
router.get('/patient/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req?.params
    let result = await patientChat(id)
    res.send(result)
}))

// GET DOCTOR CHAT
router.get('/doctor/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req?.params
    let result = await doctorChat(id)
    res.send(result)
}))

// SEND MESSAGE
router.post('/message',authorized,multerStorage.array('document',10),asyncErrorHandler(async(req,res)=>{
    let {senderId,text,chatId} = req?.body
    let document = req?.files
    let result = await sendMessage(senderId,text,chatId,document)
    res.send(result)
}))

router.get('/:chatId',authorized,asyncErrorHandler(async(req,res)=>{
    let {chatId} = req?.params
    let result = await getMessage(chatId)
    res.send(result)
}))

module.exports = router