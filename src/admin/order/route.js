const router = require('express').Router();
const { asyncErrorHandler } = require('../../../public/middleware/Error/Handler');
const { createOrder, getAllOrder, getSingleOrder } = require('./service');

router.post('/create',asyncErrorHandler(async(req,res)=>{
    let {product,amount,userId,name,email,address} = req.body
    let result = await createOrder(product,amount,userId,name,email,address)
    res.send(result)
}))

router.get('/all',asyncErrorHandler(async(req,res)=>{
    let result = await getAllOrder()
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await getSingleOrder(id)
    res.send(result)
}))

// router.put('/update/:id',asyncErrorHandler(async(ereq,res)=>{
// }))

module.exports = router