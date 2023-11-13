const LaboratryAccount = require("./model");
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const { fireBaseUploading } = require("../../../public/configuration/firebase.config");
const { tokenGenerator } = require('../../../public/middleware/Jwt/Generator');
const bcrypt = require('bcryptjs');

const RegisterLaboratry = async(name,email,phone,password,address,country,orignalname,buffer)=>{
    let findLaboratry = await LaboratryAccount.findOne({email:email})
    if(findLaboratry){
        throw new ErrorHandler("Account Already Exits Please Login",422)
    }
    else{
        let securePassword = await bcrypt.hash(password,10)
        let imageUrl =await  fireBaseUploading(orignalname,buffer) // FIREBASE IMAGE UPLOADING FUNCTION
        let createLaboratry = await LaboratryAccount.create({name,address,email,password:securePassword,phone,country,image:imageUrl})
        if (createLaboratry){
            let {createdAt,updatedAt,password,__v,...info} = createLaboratry._doc
            let createdToken = await tokenGenerator(info) // JWT TOKEN CREATION FUNCTION 
            return {info,createdToken}
        }
    }
}

const LoginLaboratry=async(email,password)=>{
    let findLaboratry = await LaboratryAccount.findOne({email:email})
    if (!findLaboratry){
        throw new ErrorHandler("No account found",404)
    }
    let comparePassword = await bcrypt.compare(password,findLaboratry?.password)
    if (comparePassword){
        let {createdAt,updatedAt,password,__v,...info} = findLaboratry._doc
        let createdToken = await tokenGenerator(info) // JWT TOKEN CREATION FUNCTION 
        return {info,createdToken}
    }
    else{
        throw new ErrorHandler("Invalid Credentials",409)
    }
}

const UpdateLaboratry=async(id,name,phone,address,country,orignalname,buffer)=>{
    if (orignalname && buffer){
        let DownloadURL = await fireBaseUploading(orignalname,buffer)
        let UpdateLaboratry = await LaboratryAccount.findByIdAndUpdate(id,{$set:{image:DownloadURL,name,address,phone,country}},{new:true})
        if (UpdateLaboratry){
            let {password,createdAt,updatedAt, __v,...info} = UpdateLaboratry._doc
            return info
        }
    }
    else{
        let UpdateLaboratry = await LaboratryAccount.findByIdAndUpdate(id,{$set:{name,address,phone,country}},{new:true})
        if (UpdateLaboratry){
            let {password,createdAt, updatedAt, __v,...info} = UpdateLaboratry._doc
            return info
        } 
    }
}

const AllLaboratry = async()=>{
    let Laboratry = await LaboratryAccount.find({})
    if (Laboratry.length>0){
        return Laboratry
    }
    throw new ErrorHandler("No Laboratry Found",404)
}

const SingleLaboratry = async(id)=>{
    let Laboratry = await LaboratryAccount.findById(id)
    if (Laboratry){
        return Laboratry
    }
    throw new ErrorHandler("No Laboratry Found Wrong Id",404)
}

module.exports = {RegisterLaboratry,LoginLaboratry,UpdateLaboratry,AllLaboratry,SingleLaboratry}