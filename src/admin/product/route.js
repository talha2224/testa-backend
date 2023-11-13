const router = require('express').Router()
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const {multerStorage} = require('../../../public/configuration/multer.config')
const { CreateProduct, GetAllProduct, GetSingleProduct, DeleteSingleProduct, UpdateProduct } = require('./service')
const authorized = require('../../../public/middleware/Jwt/Auth')

router.post("/create",authorized,multerStorage.array('image',10),asyncErrorHandler(async(req,res)=>{
    let {title,description,price,quantity} = req.body
    let image = req?.files
    let result = await CreateProduct(title,description,price,image,quantity)
    res.send(result)
}))

router.get("/get",authorized,asyncErrorHandler(async(req,res)=>{
    let result = await GetAllProduct()
    res.send(result)
}))

router.get("/single/:id",authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await GetSingleProduct(id)
    res.send(result)
}))

router.delete("/delete/:id",authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await DeleteSingleProduct(id)
    res.send(result)
}))

router.put("/update/:id",authorized,multerStorage.array('image',10),asyncErrorHandler(async(req,res)=>{
    let {title,description,price,quantity} = req.body
    let {id} = req.params
    let image = req?.files
    let result = await UpdateProduct(id,title,description,price,image,quantity)
    res.send(result)
}))

module.exports = router