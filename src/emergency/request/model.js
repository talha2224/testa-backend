const mongoose = require('mongoose');

const RequestEmergencySchema = new mongoose.Schema({
    serviceProviderId:{type:mongoose.Schema.Types.ObjectId,ref:"EmergencyServiceAccount"},
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    location:{type:String,required:true},
    destination:{type:String,required:true},
    tripType:{type:String,required:true},
    estimateCost:{type:Number,required:true}
},{timestamps:true})


const RequestEmergency = new mongoose.model('RequestEmergency',RequestEmergencySchema,'RequestEmergency')

module.exports = RequestEmergency