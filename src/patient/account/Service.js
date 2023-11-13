const { SendMail } = require("../../../public/configuration/mail.config");
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const { AccountModel } = require("./Model");
const bcrypt = require('bcryptjs');
const { tokenGenerator } = require("../../../public/middleware/Jwt/Generator");
const { fireBaseUploading } = require('../../../public/configuration/firebase.config');

// ACCOUNT REGISTER
const createAccount = async (name,email,password,key,otp,convertedGender,originalname,buffer,longitude,latitude,number1,number2) => {
    let isFound = await AccountModel.findOne({ email: email });
    if (isFound) {
        throw new ErrorHandler("account already exits please login", 422);
    } 
    else {
        let hashPassword = await bcrypt.hash(password, 10);
        let imageUrl = await fireBaseUploading(originalname,buffer)
        let createdAccount = await AccountModel.create({name: name,email: email,password: hashPassword,role: "patient",uniqueKey: key,otp: otp,gender: convertedGender,image:imageUrl,longitude,latitude,number1,number2});
        if (createdAccount) {
            let {name,longitude,latitude,email,password,gender,role,image,otp,otpVerified,uniqueKey,admin_approved,createdAt, updatedAt, __v, ...info }=createdAccount._doc;
            let createdToken = await tokenGenerator(info)
            if (createdToken) {
                let subject  = "TESTA ACCOUNT CONFIRMATION"
                let heading = "PLEASE CONFIRM YOUR OTP"
                let msg= `WELCOME TO TESTA PLEASE VERIFY THIS OTP ${otp} IN ORDER TO CONTINUE.`
                SendMail(email, otp,subject,heading,msg);                
                return {msg: "Email Verification OTP has been sent to your gmail account",info,createdToken};
            }
        } 
        else {
            throw new ErrorHandler("Failed to generate token", 500);
        }
    }
};

// OTP VERIFICATION
const otpVerification = async (otp, id) => {
    let findUser = await AccountModel.findById(id)
    if (!findUser) {
        throw new ErrorHandler("Wrong id pass no user found", 404)
    }
    else {
        if (findUser.otpVerified===true){
            return {msg:"OTP ALREADY VERIFIED"}
        }
        else{
            let isMatched = otp === findUser?.otp
            if (isMatched) {
                let approveOtp = await AccountModel.findByIdAndUpdate(id, {$set: {otpVerified: true,otp: null}}, { new: true })
                if (approveOtp) {
                    let {password,otp,otpVerified,admin_approved,createdAt, updatedAt, __v, ...info }=approveOtp._doc;
                    return {msg:"OTP Verified Your Account Has Been Sent For Admin Approval",info}
                }
                else {
                    throw new ErrorHandler("Failed to approved otp", 500)
                }
            }
            else {
                throw new ErrorHandler("Invalid Otp", 401)
            }
        }
    }
}

// ADMIN ACCOUNT APPROVAL
const accountApproval = async(id,isApproved)=>{
    let findAccount = await AccountModel.findById(id)
    if (!findAccount){
        throw new ErrorHandler("Wrong Id Passed No Such Account Found",404)
    }
    else{
        if (findAccount.admin_approved){
            return {msg:"Account Already Verified By Admin"}
        }
        else{
            let updateAccount = await AccountModel.findByIdAndUpdate(id,{$set:{admin_approved:isApproved?true:false}},{new:true})
            let {password,otp,otpVerified,createdAt, updatedAt, __v,...info} = updateAccount._doc
            return info
        }
    }
}

// LOGIN ACCOUNT
const loginAccount = async (email,password)=>{
    let findUser = await AccountModel.findOne({email:email})
    if (!findUser){
        throw new ErrorHandler("No User Registered With This Email",404)
    }
    else{
        let matchPassword = await bcrypt.compare(password,findUser.password)
        if(!matchPassword){
            throw new ErrorHandler("Invalid Credentials",409)
        }
        else{
            if(findUser.otpVerified===false){
                let deleteAccount = await AccountModel.findOneAndDelete({email:email})
                throw new ErrorHandler("You didnot verify your otp please register again",401)
            }
            else if (findUser.admin_approved===null){
                throw new ErrorHandler("Wait Your Account Has Not Approved Yet By The Admin",403)
            }
            else if (findUser.admin_approved===false){
                throw new ErrorHandler("Sorry Admin Didnot Approved Your Account",403)
            }
            let {password,otp,otpVerified,createdAt, updatedAt, __v,...info} = findUser._doc
            if (info){
                let token = await tokenGenerator(info)
                return {info,token}
            }
            return info
        }
    }
    
}

const updatePatientProfile = async (id,name,longitude,latitude,hideReports,originalname,buffer,number1,number2)=>{
    if (originalname && buffer){
        let DownloadURL = await fireBaseUploading(originalname,buffer)
        let updateUser = await AccountModel.findByIdAndUpdate(id,{$set:{image:DownloadURL,hideReports,name:name,longitude,latitude,number1,number2}},{new:true})
        if (updateUser){
            let {password,otp,otpVerified,createdAt, updatedAt, __v,...info} = updateUser._doc
            return info
        }
    }
    else{
        let updateUser = await AccountModel.findByIdAndUpdate(id,{$set:{name:name,hideReports,longitude,latitude,number1,number2}},{new:true})
        if (updateUser){
            let {password,otp,otpVerified,createdAt, updatedAt, __v,...info} = updateUser._doc
            return info
        } 
    }
}

const getSinglePatient = async(id)=>{
    let findPatient = await AccountModel.findById(id)
    if (!findPatient){
        throw new ErrorHandler("Wrong Id No Admin Found",404)
    }
    else{
        let {password,otp,otpVerified,createdAt, updatedAt, __v,...info} = findPatient._doc
        return info
    }
}

module.exports = { createAccount, otpVerification,accountApproval,loginAccount,updatePatientProfile,getSinglePatient}