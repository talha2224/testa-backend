const { Message,Chat } = require("./model");
const doctorAccount = require('../doctor/account/model')
const {AccountModel} = require('../patient/account/Model')
const { ErrorHandler } = require("../../public/middleware/Error/Handler");
const { firebaseChatUploading } = require("../../public/configuration/firebase.config");


// CREATE CHAT
const createChat = async (doctorId,patientId)=>{
    let chatExits = await Chat.findOne({doctor:doctorId,patient:patientId})
    if (chatExits){
        return {msg:"Chat ALready Created Between Doctor And Patient",sucess:false}
    }
    else{
        let createChat= await Chat.create({doctor:doctorId,patient:patientId})
        if (createChat){
            return {msg:"Chat Has Created Between Doctor And Patient",sucess:true,createChat}
        }
    }
}

// GET ALL CHAT FOR PATIENT 
const patientChat= async(id)=>{
    let findChat = await Chat.find({patient:id}).populate('doctor','-password -StarterBusiness -createdAt -updatedAt -__v ')
    if (findChat.length>0){
        return findChat
    }
    else{
        throw new ErrorHandler("No Chat Found",404)
    }
} 

// GET ALL CHAT FOR DOCTOR 
const doctorChat = async(id)=>{
    let findChat = await Chat.find({doctor:id}).populate('patient','name gender email image ')
    if (findChat.length>0){
        return findChat
    }
    else{
        throw new ErrorHandler("No Chat Found",404)
    }
}

// SEND MESSAGE 

const sendMessage = async(senderId,text,chatId,document)=>{
    let findDoctor = await doctorAccount.findById(senderId)
    let findPatient = await AccountModel.findById(senderId)
    if (findDoctor){
        if (document.length>0){
            let downloadURLS = await firebaseChatUploading(document)
            let sendMessage = await Message.create({sender:senderId,senderModel:"doctorAccount",text:text,chatId:chatId,document:downloadURLS})
            return sendMessage
        }
        let sendMessage = await Message.create({sender:senderId,senderModel:"doctorAccount",text:text,chatId:chatId})
        return sendMessage
    }
    else if (findPatient){
        if (document.length>0){
            let downloadURLS = await firebaseChatUploading(document)
            let sendMessage = await Message.create({sender:senderId,senderModel:"patientAccount",text:text,chatId:chatId,document:downloadURLS})
            return sendMessage
        }
        let sendMessage = await Message.create({sender:senderId,senderModel:"patientAccount",text:text,chatId:chatId})
        return sendMessage
    }
    else if (!findDoctor && !findPatient){
        throw new ErrorHandler("You are passing wrong senderId please fix it",404)
    }
}

// GET MESSAGE 
const getMessage = async (chatId) => {
    let allMessage = await Message.find({ chatId: chatId }).sort({ createdAt: -1 }).populate({path: 'sender',select: '-password -StarterBusiness -createdAt -updatedAt -__v',populate: {path: 'patientAccount',select: 'name gender email image'}}).exec();
    if (allMessage.length > 0) {
        return allMessage;
    } else {
        throw new ErrorHandler("No Message Found B/W USERS", 404);
    }
}

module.exports = {createChat,patientChat,doctorChat,sendMessage,getMessage}