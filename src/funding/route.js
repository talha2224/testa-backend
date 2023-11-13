const router = require ('express').Router()
const { multerStorage } = require('../../public/configuration/multer.config')
const { asyncErrorHandler } = require('../../public/middleware/Error/Handler')
const { sendDonation, getAllDonation, getSingleDonation, deleteDonation, createDonationPost, approvedPost, getAllDonationPost, getSingleDonationPost, deleteDonationPost, updateDonationPost, getAllDonationPostForAdmin } = require('./service')


// DONATION POST
router.post('/post/create',multerStorage.array('images',10),asyncErrorHandler(async(req,res)=>{
    let {createdBy,donationRequried,heading,para,location} = req.body
    let images = req?.files
    let result = await createDonationPost(createdBy,donationRequried,images,heading,para,location)
    res.send(result)
}))

router.put('/post/approved/:id',asyncErrorHandler(async(req,res)=>{
    let {approved} = req.body
    let {id} = req?.params
    let result = await approvedPost(id,approved)
    res.send(result)
}))

router.get('/post/all',asyncErrorHandler(async(req,res)=>{
    let result = await getAllDonationPost()
    res.send(result)
}))

router.get('/post/admin/all',asyncErrorHandler(async(req,res)=>{
    let result = await getAllDonationPostForAdmin()
    res.send(result)
}))

router.get('/post/single/:id',asyncErrorHandler(async(req,res)=>{
    let{id}=req.params
    let result = await getSingleDonationPost(id)
    res.send(result)
}))

router.delete('/post/delete/:id',asyncErrorHandler(async(req,res)=>{
    let{id}=req.params
    let result = await deleteDonationPost(id)
    res.send(result)
}))
router.put('/post/update/:id',multerStorage.array('images',10),asyncErrorHandler(async(req,res)=>{
    let {heading,para} = req.body
    let{id}=req.params
    let images = req?.files
    let result = await updateDonationPost(id,images,heading,para)
    res.send(result)
}))

//MAIN DONATION 
router.post('/donate',asyncErrorHandler(async(req,res)=>{
    let {name,email,donatingAmount,donatedTo} = req.body
    let result = await sendDonation(name,email,donatingAmount,donatedTo)
    res.send(result)
}))

router.get('/all/:donatedTo',asyncErrorHandler(async(req,res)=>{
    let {donatedTo} = req.params
    let result = await getAllDonation(donatedTo)
    res.send(result)
}))

router.get('/single/:id',asyncErrorHandler(async(req,res)=>{
    let{id}=req.params
    let result = await getSingleDonation(id)
    res.send(result)
}))

router.delete('/delete/:id',asyncErrorHandler(async(req,res)=>{
    let{id}=req.params
    let result = await deleteDonation(id)
    res.send(result)
}))

module.exports = router