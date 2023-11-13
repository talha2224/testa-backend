const {ErrorHandler} = require('../../../public/middleware/Error/Handler')
const Antenal = require('./model')

const HireDoctor =async(patientId,doctorId,pregnancyMonth)=>{
    let hireDoctor = await Antenal.create({patient:patientId,doctor:doctorId,pregnancyMonth:pregnancyMonth})
    if (hireDoctor){
        return hireDoctor
    }
    else{
        throw new ErrorHandler("patientId,doctorId,pregnancyMonth these fields are required",403)
    }
}

const getForPatient = async (patientId)=>{
    let find = await Antenal.findOne({patient:patientId}).populate('doctor','-password -StarterBusiness -_v -createdAt -updatedAt')
    if (find){
        return find
    }
    else{
        throw new ErrorHandler("You didnot hire any doctor",404)
    }

}

const getForDoctor = async (doctorId)=>{
    let find = await Antenal.find({doctor:doctorId}).populate('patient','-password -uniqueKey -admin_approved -otpVerified -otp -createdAt -updatedAt')
    if (find.length>0){
        return find
    }
    else{
        throw new ErrorHandler("You didnot hire any doctor",404)
    }

}

const appointmentBooking = async(id,date,hour,minute,ampm)=>{  
    const appointment ={date,hour,minute,ampm}
    let createAppoinment = await Antenal.findByIdAndUpdate(id,{$set:{appointment:appointment}},{new:true})
    return createAppoinment
}

const approvedAppoinment = async(id,approved)=>{
    if(approved){
        let updateAppoinment = await Antenal.findByIdAndUpdate(id,{$set:{'appointment.approved':approved}},{new:true}) 
        return updateAppoinment
    }
    else if (!approved){
        let updateAppoinment = await Antenal.findByIdAndUpdate(id,{$set:{'appointment.decline':approved}},{new:true}) 
        return updateAppoinment 
    }
}

const getAllAppoinment = async(doctorId)=>{
    let allAppoinments = await Antenal.find({doctor:doctorId}).sort({createdAt:-1}).populate('patient','-password -uniqueKey -admin_approved -otpVerified -otp -createdAt -updatedAt')
    if(allAppoinments.length>0){
        return allAppoinments
    }
    throw new ErrorHandler("No appoinment booked",404)
}

const getSingleAppoinment = async(id)=>{
    let allAppoinments = await Antenal.findById(id).populate('patient','-password -uniqueKey -admin_approved -otpVerified -otp -createdAt -updatedAt')
    if(allAppoinments){
        return allAppoinments
    }
    throw new ErrorHandler("No appoinment booked",404)
}


module.exports = {HireDoctor,getForDoctor,getForPatient,approvedAppoinment,appointmentBooking,getAllAppoinment,getSingleAppoinment}