const router = require('express').Router()
const { multerStorage } = require('../../../public/configuration/multer.config')
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler')
const { postVaccinationProduct, GetAllVaccinationProduct, GetSingleVaccinationProduct, DeleteSingleVaccinationProduct, UpdateVaccinationProduct } = require('./service')
const authorized = require('../../../public/middleware/Jwt/Auth')

router.post("/create",authorized,multerStorage.array('image',10),asyncErrorHandler(async(req,res)=>{
    let {title,description,price,quantity} = req.body
    let image = req?.files
    let result = await postVaccinationProduct(title,description,price,image,quantity)
    res.send(result)
}))

router.get("/get",authorized,asyncErrorHandler(async(req,res)=>{
    let result = await GetAllVaccinationProduct()
    res.send(result)
}))

router.get("/single/:id",authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await GetSingleVaccinationProduct(id)
    res.send(result)
}))

router.delete("/delete/:id",authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await DeleteSingleVaccinationProduct(id)
    res.send(result)
}))

router.put("/update/:id",authorized,multerStorage.array('image',10),asyncErrorHandler(async(req,res)=>{
    let {title,description,price,quantity} = req.body
    let {id} = req.params
    let image = req?.files
    let result = await UpdateVaccinationProduct(id,title,description,price,image,quantity)
    res.send(result)
}))


module.exports = router