const mongoose = require('mongoose')


const PrescriptionSchema = new mongoose.Schema({
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"doctorAccount"},
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    prescription:{type:String,required:true},
    condition:{type:String,required:true},
    date:{type:String,required:true}
})


const Prescription = new mongoose.model('Prescription',PrescriptionSchema,'Prescription')

module.exports = Prescription