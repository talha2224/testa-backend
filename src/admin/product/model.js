const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:Array,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

const Product = new mongoose.model("Product",productSchema,"Product")
module.exports = Product