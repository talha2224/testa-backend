const HospitalAccount = require("./model");
const {Screening} = require('../laboratry/screening/model')
const { ErrorHandler } = require("../../public/middleware/Error/Handler");
const { fireBaseUploading } = require("../../public/configuration/firebase.config");
const { tokenGenerator } = require('../../public/middleware/Jwt/Generator');
const bcrypt = require('bcryptjs');

const RegisterHospital = async(firstname,lastname,email,phone,password,address,country,orignalname,buffer)=>{
    let findHospital = await HospitalAccount.findOne({email:email})
    if(findHospital){
        throw new ErrorHandler("Account Already Exits Please Login",422)
    }
    else{
        let securePassword = await bcrypt.hash(password,10)
        let imageUrl =await  fireBaseUploading(orignalname,buffer) // FIREBASE IMAGE UPLOADING FUNCTION
        let createHospital = await HospitalAccount.create({firstname,lastname,address,email,password:securePassword,phone,country,image:imageUrl})
        if (createHospital){
            let {createdAt,updatedAt,password,__v,...info} = createHospital._doc
            let createdToken = await tokenGenerator(info)
            return {info,createdToken}
        }
    }
}

const LogiHospital=async(email,password)=>{
    let findHospital = await HospitalAccount.findOne({email:email})
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

const Updatehospital=async(id,firstname,lastname,phone,address,country,orignalname,buffer)=>{
    if (orignalname && buffer){
        let DownloadURL = await fireBaseUploading(orignalname,buffer)
        let UpdateHospital = await HospitalAccount.findByIdAndUpdate(id,{$set:{image:DownloadURL,firstname,lastname,address,phone,country}},{new:true})
        if (UpdateHospital){
            let {password,createdAt,updatedAt, __v,...info} = UpdateHospital._doc
            return info
        }
    }
    else{
        let UpdateHospital = await HospitalAccount.findByIdAndUpdate(id,{$set:{firstname,lastname,address,phone,country}},{new:true})
        if (UpdateHospital){
            let {password,createdAt, updatedAt, __v,...info} = UpdateHospital._doc
            return info
        } 
    }
}

const AllHospital = async()=>{
    let Hospital = await HospitalAccount.find({})
    if (Hospital.length>0){
        return Hospital
    }
    throw new ErrorHandler("No Laboratry Found",404)
}

const SingleHospital = async(id)=>{
    let Hospital = await HospitalAccount.findById(id)
    if (Hospital){
        return Hospital
    }
    throw new ErrorHandler("No Laboratry Found Wrong Id",404)
}

const getPatientReportsForHospitals = async  ()=>{
    let findScreening = await Screening.find({status:"Complete"}).populate('patientId')
    
    const screeningsWithVisibleReports = findScreening.filter(screening => {
        return screening.patientId && !screening.patientId.hideReports;
    });
    if (screeningsWithVisibleReports.length>0){
        return screeningsWithVisibleReports
    }
    else{
        throw new ErrorHandler("No Medical Report For Patient",404)
    }
}



module.exports = {RegisterHospital,LogiHospital,Updatehospital,AllHospital,SingleHospital,getPatientReportsForHospitals}