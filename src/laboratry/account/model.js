const mongoose = require('mongoose');


const LaboratryAccountSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String,required:true},
    StarterBusiness:{type:String,default:"Laboratry"},
    image:{type:String,required:true},
},{timestamps:true})

const LaboratryAccount = new mongoose.model('LaboratryAccount',LaboratryAccountSchema,'LaboratryAccount')

module.exports = LaboratryAccount