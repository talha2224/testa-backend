const router = require('express').Router()
const { asyncErrorHandler } = require("../../../public/middleware/Error/Handler");
const {multerStorage} = require('../../../public/configuration/multer.config');
const { RegisterLaboratry, LoginLaboratry, UpdateLaboratry, AllLaboratry, SingleLaboratry } = require('./service');


router.post('/register',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    let {name,email,phone,password,address,country } = req.body 
    let orignalname = req?.file?.orignalname
    let buffer = req?.file?.buffer
    let result = await RegisterLaboratry(name,email,phone,password,address,country,orignalname,buffer)
    res.send(result)

}))

router.post('/login',asyncErrorHandler(async(req,res)=>{
    let {email,password} = req.body 
    let result = await LoginLaboratry(email,password)
    res.send(result)

}))

router.put('/update/:id',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    let {name,phone,address,country } = req.body 
    let {id} = req.params
    let orignalname = req?.file?.orignalname
    let buffer = req?.file?.buffer
    let result = await UpdateLaboratry(id,name,phone,address,country,orignalname,buffer)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await AllLaboratry()
    res.send(result)
}))


router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await SingleLaboratry(id)
    res.send(result)
}))


module.exports = router