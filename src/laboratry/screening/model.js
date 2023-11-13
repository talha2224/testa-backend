const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    laboratryId:{type:mongoose.Schema.Types.ObjectId,ref:"LaboratryAccount"},
    fromHome:{type:Boolean,default:false},
    testCategory:{type:String},
    date:{type:String},
    time1:{type:Number},
    time2:{type:Number},
    ampm:{time:String},
    testResult:{type:Array},
    status:{type:String,default:"Pending"}

})

const screeningResultSchema = new mongoose.Schema({
    screeningId:{type:mongoose.Schema.Types.ObjectId,ref:"Screening"},
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    laboratryId:{type:mongoose.Schema.Types.ObjectId,ref:"LaboratryAccount"},
    reports:{type:Array},
    approved:{type:Boolean,default:false}
})

const Screening = new mongoose.model('Screening',screeningSchema,'Screening')
const ScreeningResult = new mongoose.model('ScreeningResult',screeningResultSchema,'ScreeningResult')

module.exports = {Screening,ScreeningResult}