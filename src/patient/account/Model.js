const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    role:{type:String,required:true},
    name:{type:String,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true},
    longitude:{type:Number,required:true},
    latitude:{type:Number,required:true},
    number1:{type:Number,required:true},
    number2:{type:Number,required:true},
    password:{type:String,required:true},
    hideReports:{type:Boolean,default:false},
    uniqueKey:{type:String},
    image:{type:String,required:true},
    admin_approved:{type:Boolean,default:null},
    otp:{type:Number},
    otpVerified:{type:Boolean,default:false},
},
{timestamps:true}
)



const AccountModel = new mongoose.model('patientAccount',AccountSchema,'patientAccount')

module.exports={AccountModel}