const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const { fireBaseUploading } = require("../../../public/configuration/firebase.config");
const { tokenGenerator } = require('../../../public/middleware/Jwt/Generator');
const bcrypt = require('bcryptjs');
const EmergencyServiceAccount = require("./model");

const RegisterEmergency = async(name,email,phone,password,address,avalabilityFrom,availabilityTill,country,originalname,buffer,esitimateCost)=>{
    let findEmergency = await EmergencyServiceAccount.findOne({email:email})
    if(findEmergency){
        throw new ErrorHandler("Account Already Exits Please Login",422)
    }
    else{
        let securePassword = await bcrypt.hash(password,10)
        let imageUrl =await  fireBaseUploading(originalname,buffer) // FIREBASE IMAGE UPLOADING FUNCTION
        let createHospital = await EmergencyServiceAccount.create({name,address,email,password:securePassword,phone,country,image:imageUrl,avalabilityFrom,availabilityTill,esitimateCost})
        if (createHospital){
            let {createdAt,updatedAt,password,__v,...info} = createHospital._doc
            let createdToken = await tokenGenerator(info)
            return {info,createdToken}
        }
    }
}

const LoginEmergencyAccount=async(email,password)=>{
    let findHospital = await EmergencyServiceAccount.findOne({email:email})
    if (!findHospital){
        throw new ErrorHandler("No account found",404)
    }
    let comparePassword = await bcrypt.compare(password,findHospital?.password)
    if (comparePassword){
        let {createdAt,updatedAt,password,__v,...info} = findHospital._doc
        let createdToken = await tokenGenerator(info) // JWT TOKEN CREATION FUNCTION 
        return {info,createdToken}
    }
    else{
        throw new ErrorHandler("Invalid Credentials",409)
    }
}

const UpdateEmergencyServiceProvider=async(id,name,phone,address,avalabilityFrom,availabilityTill,country,originalname,buffer,esitimateCost)=>{
    let Hospital = await EmergencyServiceAccount.findById(id)
    if (Hospital){
        if (originalname && buffer){
            let DownloadURL = await fireBaseUploading(originalname,buffer)
            if (avalabilityFrom){
                let UpdateHospital = await EmergencyServiceAccount.findByIdAndUpdate(id,{$set:{image:DownloadURL,name,address,phone,country,avalabilityFrom,esitimateCost}},{new:true})
                if (UpdateHospital){
                    let {password,createdAt,updatedAt, __v,...info} = UpdateHospital._doc
                    return info
                }
            }
            else if (availabilityTill){
                let UpdateHospital = await EmergencyServiceAccount.findByIdAndUpdate(id,{$set:{image:DownloadURL,name,address,phone,country,availabilityTill,esitimateCost}},{new:true})
                if (UpdateHospital){
                    let {password,createdAt,updatedAt, __v,...info} = UpdateHospital._doc
                    return info
                }
            }
        }
        else{
            if (avalabilityFrom){
                let UpdateHospital = await EmergencyServiceAccount.findByIdAndUpdate(id,{$set:{name,address,phone,esitimateCost,country,avalabilityFrom}},{new:true})
                if (UpdateHospital){
                    let {password,createdAt,updatedAt, __v,...info} = UpdateHospital._doc
                    return info
                }
            }
            else if (availabilityTill){
                let UpdateHospital = await EmergencyServiceAccount.findByIdAndUpdate(id,{$set:{name,address,esitimateCost,phone,country,availabilityTill}},{new:true})
                if (UpdateHospital){
                    let {password,createdAt,updatedAt, __v,...info} = UpdateHospital._doc
                    return info
                }
            }
        }
    }

    throw new ErrorHandler("wrong id bro pass correct id",404)

}

const AllServiceProvider = async()=>{
    let Hospital = await EmergencyServiceAccount.find({})
    if (Hospital.length>0){
        return Hospital
    }
    throw new ErrorHandler("No Laboratry Found",404)
}

const SingleServiceProvider = async(id)=>{
    let Hospital = await EmergencyServiceAccount.findById(id)
    if (Hospital){
        return Hospital
    }
    throw new ErrorHandler("No Laboratry Found Wrong Id",404)
}




module.exports = {RegisterEmergency,LoginEmergencyAccount,AllServiceProvider,SingleServiceProvider,UpdateEmergencyServiceProvider}