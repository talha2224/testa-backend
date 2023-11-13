const mongoose = require('mongoose');

const antenalSchema = new mongoose.Schema({
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'patientAccount'},
    doctor:{type:mongoose.Schema.Types.ObjectId,ref:'doctorAccount'},
    pregnancyMonth:{type:Number,required:true},
    appointment: {
        date: { type: Date },
        hour: { type: Number, },
        minute: { type: Number, },
        ampm: { type: String, enum: ['am', 'pm',null] },
        approved:{type:Boolean,default:false},
        decline:{type:Boolean,default:false}
    }
},{timestamps:true})

const Antenal = new mongoose.model('Antenal',antenalSchema,'Antenal')

module.exports = Antenal
