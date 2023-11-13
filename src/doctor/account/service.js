const { fireBaseUploading } = require('../../../public/configuration/firebase.config')
const { ErrorHandler } = require('../../../public/middleware/Error/Handler');
const { tokenGenerator } = require('../../../public/middleware/Jwt/Generator');
const doctorAccount = require('./model')
const bcrypt = require('bcryptjs');


const registerDoctor = async(firstname,lastname,email,password,specialization,phone,country,originalname,buffer)=>{
    let findDoctor = await doctorAccount.findOne({email:email})
    if(findDoctor){
        throw new ErrorHandler("Account Already Exits Please Login",422)
    }
    else{
        let securePassword = await bcrypt.hash(password,10)
        let imageUrl =await  fireBaseUploading(originalname,buffer) // FIREBASE IMAGE UPLOADING FUNCTION
        let createDoctor = await doctorAccount.create({firstname,lastname,email,password:securePassword,specialization,phone,country,image:imageUrl})
        if (createDoctor){
            let {createdAt,updatedAt,password,__v,...info} = createDoctor._doc
            let createdToken = await tokenGenerator(info) // JWT TOKEN CREATION FUNCTION 
            return {info,createdToken}
        }
    }
}

const loginDoctor = async(email,password)=>{
    let findDoctor = await doctorAccount.findOne({email:email})
    if (!findDoctor){
        throw new ErrorHandler("No account found",404)
    }
    let comparePassword = await bcrypt.compare(password,findDoctor?.password)
    if (comparePassword){
        let {createdAt,updatedAt,password,__v,...info} = findDoctor._doc
        let createdToken = await tokenGenerator(info) // JWT TOKEN CREATION FUNCTION 
        return {info,createdToken}
    }
    else{
        throw new ErrorHandler("Invalid Credentials",409)
    }
}

const getAllDoctor = async()=>{
    let allDoctor = await doctorAccount.find({})
    if (allDoctor.length>0){
        return allDoctor
    }
    else{
        throw new ErrorHandler("No doctor found",404)
    }
}

const getSingelDoctor= async(id)=>{
    let findDoctor = await doctorAccount.findById(id)
    if (findDoctor){
        return findDoctor
    }
    else{
        throw new ErrorHandler("No doctor found wrong id",404)
    }
}

const getBySpecialization = async(specialization)=>{
    let allDoctor = await doctorAccount.find({specialization:specialization})
    if (allDoctor.length>0){
        return allDoctor
    }
    else{
        throw new ErrorHandler("No doctor found",404)
    }
}

const updateDoctorProfile = async(id,firstname,lastname,specialization,phone,country,originalname,buffer)=>{

    if (originalname && buffer){
        let DownloadURL = await fireBaseUploading(originalname,buffer)
        let updateDoctor = await doctorAccount.findByIdAndUpdate(id,{$set:{image:DownloadURL,firstname,lastname,specialization,phone,country}},{new:true})
        if (updateDoctor){
            let {password,otp,otpVerified,createdAt,updatedAt, __v,...info} = updateDoctor._doc
            return info
        }
    }
    else{
        let updateDoctor = await doctorAccount.findByIdAndUpdate(id,{$set:{firstname,lastname,specialization,phone,country}},{new:true})
        if (updateDoctor){
            let {password,otp,otpVerified,createdAt,StarterBusiness, updatedAt, __v,...info} = updateDoctor._doc
            return info
        } 
    }

}



module.exports = {registerDoctor,loginDoctor,getAllDoctor,getSingelDoctor,getBySpecialization,updateDoctorProfile}