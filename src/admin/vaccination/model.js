const mongoose = require('mongoose');


const vaccinationSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:Array,required:true},
    price:{type:Number,required:true},
    quantity:{type:String,required:true}
})


const Vaccination = new mongoose.model('Vaccination',vaccinationSchema,'Vaccination')


module.exports = Vaccination