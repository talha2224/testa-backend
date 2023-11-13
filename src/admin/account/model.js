const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true}
},{timestamps:true})

const AdminAccount = new mongoose.model('AdminAccount',AccountSchema,'AdminAccount')

module.exports = AdminAccount