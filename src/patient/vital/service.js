const {VitalSign,HealthScore} = require("./model");
const {ErrorHandler} = require('../../../public/middleware/Error/Handler')


const CreateVital = async(patientId,height,weight,gender,age,bloodGroup,bloodGenotype)=>{
    let create = await VitalSign.create({patientId,height,weight,gender,age,bloodGroup,bloodGenotype})
    return create
}

const GetVital= async(id)=>{
    let find = await VitalSign.findOne({patientId:id}).populate('patientId','-password -updatedAt -createdAt -otp -otpVerified -uniqueKey -admin_approved')
    if (find){
        return find
    }
    throw new ErrorHandler("Wrong ID")
}

const GetSingleVital= async(id)=>{
    let find = await VitalSign.findById(id).populate('patientId','-password -updatedAt -createdAt -otp -otpVerified -uniqueKey -admin_approved')
    if (find){
        return find
    }
    throw new ErrorHandler("Wrong ID")
}

const UpdateVital = async(id,height,weight,gender,age,bloodGroup,bloodGenotype)=>{
    let update = await VitalSign.findByIdAndUpdate(id,{$set:{height,weight,gender,age,bloodGroup,bloodGenotype}},{new:true})
    if (update){
        return update
    }
    throw new ErrorHandler("Wrong ID Update Failed")
}

// HEALTH SCORE
const createHealth = async(patientId,BMI,PulseRate,BloodPressure,GlucoseLevel)=>{
    let create = await HealthScore.create({patientId,BMI,PulseRate,BloodPressure,GlucoseLevel})
    return create
}

const GetHealth= async(id)=>{
    let find = await HealthScore.findOne({patientId:id}).populate('patientId','-password -updatedAt -createdAt -otp -otpVerified -uniqueKey -admin_approved').sort({createdAt:-1}).limit(1)
    if (find){
        return find
    }
    throw new ErrorHandler("Wrong ID",404)
}
// BMI,PulseRate,BloodPressure,GlucoseLevel
const UpdateHealth = async(id,BMI,PulseRate,BloodPressure,GlucoseLevel)=>{
    let update = await HealthScore.findByIdAndUpdate(id,{$set:{BMI,PulseRate,BloodPressure,GlucoseLevel}},{new:true})
    if (update){
        return update
    }
    throw new ErrorHandler("Wrong ID Update Failed")
}
module.exports = {CreateVital,GetSingleVital,GetVital,UpdateVital,createHealth,GetHealth,UpdateHealth}