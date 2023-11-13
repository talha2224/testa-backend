const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Product'},
            quantity: {type: Number,default: 1,required:true}
        }
    ],
    vaccinationProduct: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Vaccination'},
            quantity: {type: Number,default: 1,required:true}
        }
    ],
    totalPrice: {type: Number,required: true},
    name: {type: String,required: true},
    address: {type: String,required: true},
    email:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"},
    payment:{type:Boolean,default:false},
    dispatch:{type:Boolean,default:false}
},{timestamps:true})

const Order = mongoose.model('Order', orderSchema,'Order')


module.exports = Order
