const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const {multerStorage} = require('../../../public/configuration/multer.config')
const { RegisterAdmin, LoginAdmin, getAdminProfile, updateAdminProfile } = require('./service')


router.post('/register',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    const {name,email,password} = req.body
    let result = await RegisterAdmin(name,email,password,originalname,buffer)
    res.send(result)
}))

router.post('/login',asyncErrorHandler(async(req,res)=>{
    const {email,password} = req.body
    let result = await LoginAdmin(email,password)
    res.send(result)
}))

router.get('/:id',asyncErrorHandler(async(req,res)=>{
    let {id}=req?.params
    let result = await getAdminProfile(id)
    res.send(result)
}))

router.put('/update/:id',multerStorage.single('image'),asyncErrorHandler(async(req,res)=>{
    const originalname = req?.file?.originalname
    const buffer = req?.file?.buffer
    const {name} = req.body
    let {id} = req?.params
    let result = await updateAdminProfile(id,name,originalname,buffer)
    res.send(result)
}))

module.exports = router