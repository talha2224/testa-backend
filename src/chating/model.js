const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel'
    },
    senderModel: {
        type: String,
        enum: ['doctorAccount', 'patientAccount']
    },
    text:{
        type:String
    },
    document:{
        type:Array
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{timestamps:true})

const chatSchema = new mongoose.Schema({
    doctor:{type:mongoose.Schema.Types.ObjectId,ref:"doctorAccount"},
    patient:{type:mongoose.Schema.Types.ObjectId,ref:"patientAccount"}
});


const Message = new mongoose.model('Message',messageSchema,'Message')
const Chat = new mongoose.model('Chat',chatSchema,'Chat')

module.exports = {Message,Chat}