const Prescription = require("./model");
const {ErrorHandler} = require('../../../public/middleware/Error/Handler')



const postPrescription = async (patientId,doctorId,prescription,condition,date)=>{
    let create = await Prescription.create({patientId,doctorId,prescription,condition,date})
    return create
}


const getByPatientId = async (patientId)=>{
    let findAllPrescription = await Prescription.find({patientId:patientId}).populate('doctorId')
    if (findAllPrescription.length>0){
        return findAllPrescription
    }
    throw new ErrorHandler("No Prescription Found",404)
}

const getByDoctorId = async (doctorId)=>{
    let findAllPrescription = await Prescription.find({doctorId:doctorId}).populate('patientId')
    if (findAllPrescription.length>0){
        return findAllPrescription
    }
    throw new ErrorHandler("No Prescription Found",404)
}

const getSingle = async (id)=>{
    let findPrescription = await Prescription.findById(id).populate('patientId').populate('doctorId')
    if (findPrescription){
        return findPrescription
    }
    throw new ErrorHandler("No Prescription Found",404)
}

const updatePrescription = async (id,prescription,condition,date)=>{
    let findPrescription = await Prescription.findById(id)
    if (findPrescription){
        let update = await Prescription.findByIdAndUpdate(id,{$set:{prescription,condition,date}},{new:true})
        if (update){
            return update
        }
    }
    throw new ErrorHandler("Wrond Id",404)
}

module.exports = {postPrescription,getByDoctorId,updatePrescription,getSingle,getByPatientId}