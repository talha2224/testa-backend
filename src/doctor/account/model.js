const mongoose = require('mongoose');


const doctorAccountSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    country:{type:String,required:true},
    StarterBusiness:{type:String,default:"Medical Professionals"},
    image:{type:String,required:true},
    specialization:{type:String,required:true},
},{timestamps:true})

const doctorAccount = new mongoose.model('doctorAccount',doctorAccountSchema,'doctorAccount')

module.exports = doctorAccount