const mongoose = require('mongoose');

const EmergencyAccountSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    image:{type:String,required:true},
    avalabilityFrom:{type:Number,required:true},
    availabilityTill:{type:Number,required:true},
    esitimateCost:{type:Number,required:true},
    country:{type:String,required:true},
    bussinessType:{type:String,default:"Emergency Service"}
})

const EmergencyServiceAccount = new mongoose.model('EmergencyServiceAccount',EmergencyAccountSchema,'EmergencyServiceAccount')

module.exports = EmergencyServiceAccount