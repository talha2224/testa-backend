const router = require('express').Router()
const {asyncErrorHandler} = require('../../../public/middleware/Error/Handler')
const { UpdateVital, GetVital, CreateVital, GetSingleVital, createHealth, GetHealth, UpdateHealth } = require('./service')
const authorized = require('../../../public/middleware/Jwt/Auth')

router.post('/create',authorized,asyncErrorHandler(async(req,res)=>{
    let {patientId,height,weight,gender,age,bloodGroup,bloodGenotype} = req.body
    let result = await CreateVital(patientId,height,weight,gender,age,bloodGroup,bloodGenotype)
    res.send(result)
}))

router.get('/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await GetSingleVital(id)
    res.send(result)

}))


router.get('/patient/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await GetVital(id)
    res.send(result)

}))

router.put('/update/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {height,weight,gender,age,bloodGroup,bloodGenotype} = req.body
    let result = await UpdateVital(id,height,weight,gender,age,bloodGroup,bloodGenotype)
    res.send(result)
}))

// HEALTH SCORE 
router.post("/health/create",authorized,asyncErrorHandler(asyncErrorHandler(async(req,res)=>{
    let {patientId,BMI,PulseRate,BloodPressure,GlucoseLevel} = req.body
    let data = await createHealth(patientId,BMI,PulseRate,BloodPressure,GlucoseLevel)
    res.send(data)
})))

router.get('/health/patient/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let result = await GetHealth(id)
    res.send(result)
}))

router.put('health/update/:id',authorized,asyncErrorHandler(async(req,res)=>{
    let {id} = req.params
    let {BMI,PulseRate,BloodPressure,GlucoseLevel} = req.body
    let result = await UpdateHealth(id,BMI,PulseRate,BloodPressure,GlucoseLevel)
    res.send(result)
}))

module.exports = router