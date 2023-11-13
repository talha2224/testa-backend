const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    height:{type:Number},
    weight:{type:Number},
    gender:{type:String},
    age:{type:Number},
    bloodGroup:{type:String},
    bloodGenotype:{type:String}
})

const HealthScoreSchema= new mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    BMI:{type:Number},
    PulseRate:{type:String},
    BloodPressure:{type:Number},
    GlucoseLevel:{type:String},
},{timestamps:true})

const VitalSign = new mongoose.model('VitalSign',vitalSchema,'VitalSign')
const HealthScore = new mongoose.model('HealthScore',HealthScoreSchema,'HealthScore')


module.exports = {VitalSign,HealthScore}