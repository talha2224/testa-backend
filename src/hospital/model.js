const mongoose = require('mongoose');


const HospitalAccountSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String,required:true},
    StarterBusiness:{type:String,default:"Hospital"},
    image:{type:String,required:true},
},{timestamps:true})

const HospitalAccount = new mongoose.model('HospitalAccount',HospitalAccountSchema,'HospitalAccount')

module.exports = HospitalAccount