const mongoose = require('mongoose');


const donationPostSchema = new mongoose.Schema({
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    donationRequried:{type:Number,required:true},
    donationRaised:{type:Number,default:0},
    approved:{type:Boolean,default:false},
    images:{type:Array,required:true},
    heading:{type:String,required:true},
    para:{type:String,required:true},
    location:{type:String,required:true},

},{timestamps:true})

const donationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    donatingAmount:{type:Number,required:true},
    donatedTo:{type:mongoose.Schema.Types.ObjectId,ref:"donationPost"}
    // donationRaised
},{timestamps:true})

const donationPost = new mongoose.model('donationPost',donationPostSchema,'donationPost')
const donation = new mongoose.model('donation',donationSchema,'donation')

module.exports = {donation,donationPost}