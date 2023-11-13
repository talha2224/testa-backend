const AdminAccount = require("./model");
const {ErrorHandler} = require('../../../public/middleware/Error/Handler')
const {fireBaseUploading} = require('../../../public/configuration/firebase.config')
const bcrypt = require('bcryptjs');
const { tokenGenerator } = require("../../../public/middleware/Jwt/Generator");

const RegisterAdmin = async(name,email,password,originalname,buffer)=>{
    let isPresent = await AdminAccount.findOne({email:email})
    if (isPresent){
        throw new ErrorHandler("Account Already Exits Please Login",409)
    }
    else{
        let securePassword = await bcrypt.hash(password,10)
        let downloadUrl = await fireBaseUploading(originalname,buffer)
        let createdUser = await AdminAccount.create({name:name,email:email,password:securePassword,image:downloadUrl})
        if (createdUser){
            let {password,updatedAt,createdAt,__v,...info} = createdUser._doc
            let token = await tokenGenerator(createdUser)
            return {createdUser,token}
        }
    }
}

const LoginAdmin = async (email,password)=>{
    let isExits = await AdminAccount.findOne({email:email})
    if (!isExits){
        throw new ErrorHandler("Email Not Found",404)
    }
    else{
        let isMatched = await bcrypt.compare(password,isExits.password)
        if (!isMatched){
            throw new ErrorHandler("Invalid Credentials",403)
        }
        else{
            let {password,updatedAt,createdAt,__v,...info} = isExits._doc
            let token = await tokenGenerator(info)
            return {info,token}
        }
    }
}

const getAdminProfile = async(id)=>{
    let findAdmin = await AdminAccount.findById(id)
    if (!findAdmin){
        throw new ErrorHandler("Wrong Id No Admin Found",404)
    }
    else{
        let {password,updatedAt,createdAt,__v,...info} = findAdmin._doc
        return info
    }
}

const updateAdminProfile = async(id,name,originalname,buffer)=>{
    if (originalname && buffer){
        let downloadUrl = await fireBaseUploading(originalname,buffer)
        let updateProfile = await AdminAccount.findByIdAndUpdate(id,{$set:{image:downloadUrl,name:name}},{new:true})
        if (updateProfile){
            let {password,updatedAt,createdAt,__v,...info} = updateProfile._doc
            return info
        }
    }
    else{
        let updateProfile = await AdminAccount.findByIdAndUpdate(id,{$set:{name:name}},{new:true})
        if (updateProfile){
            let {password,updatedAt,createdAt,__v,...info} = updateProfile._doc
            return info
        }
    }
}

module.exports = {RegisterAdmin,LoginAdmin,getAdminProfile,updateAdminProfile}