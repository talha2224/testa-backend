const RequestEmergency = require("./model");
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");



const requestForEmergency = async(serviceProviderId,patientId,location,destination,tripType,estimateCost)=>{
    let create = await RequestEmergency.create({serviceProviderId,patientId,location,destination,tripType,estimateCost})
    return create
}

const getByServiceProvider = async(serviceId)=>{
    let get = await RequestEmergency.find({serviceProviderId:serviceId}).populate("patientId")
    if (get.length>0){
        return get
    }
    else{
        throw new ErrorHandler("Not Found Yet",404)
    }
}

const getByPatient = async(patientId)=>{
    let get = await RequestEmergency.find({patientId:patientId}).populate('serviceProviderId')
    if (get.length>0){
        return get
    }
    else{
        throw new ErrorHandler("Not Found Yet",404)
    }
}

const getSingle = async(id)=>{
    let get = await RequestEmergency.findById(id).populate('serviceProviderId').populate('patientId')
    if (get){
        return get
    }
    else{
        throw new ErrorHandler("Not Found Wrong Id",404)
    }
}

const getAllForAdmin = async()=>{
    let get = await RequestEmergency.find({}).populate('serviceProviderId').populate('patientId')
    if (get.length>0){
        return get
    }
    else{
        throw new ErrorHandler("Not Found Yet",404)
    }
}

module.exports = {requestForEmergency,getByServiceProvider,getByPatient,getSingle,getAllForAdmin}
