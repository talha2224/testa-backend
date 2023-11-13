const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const { firebaseChatUploading } = require("../../../public/configuration/firebase.config");
const { Screening, ScreeningResult } = require("./model");
const { SendMail } = require("../../../public/configuration/mail.config");
const LaboratryAccount = require("../account/model");
const {AccountModel} = require('../../patient/account/Model')
const AdminAccount = require('../../admin/account/model')



const bookTest = async (patientId,laboratryId,fromHome,testCategory,date,time1,time2,ampm) => {
    console.log(patientId)
    let findPatient = await AccountModel.findById(patientId)
    if (findPatient){
        let booking = await Screening.create({ patientId, laboratryId, fromHome, testCategory, date, time1, time2, ampm })
        if (booking) {
            if (laboratryId) {
                let findLab = await LaboratryAccount.findById(laboratryId)
                SendMail(findLab?.email, "New Test Booking", `${testCategory} Test Booking`, `${findPatient.name} booked a appoinment please chech your dashboard for more details`)
                SendMail(findPatient?.email, "Test Booking", `${testCategory} Test Booking`, `${findPatient.name} your appoinment has been sent to laboratry please wait for it's approval`)
            }
            else {
                let findAdmin = await AdminAccount.find({});
                SendMail(findPatient?.email, "Test Booking", `${testCategory} Test Booking`, `${findPatient.name} your testing from home has been sent to admin please wait for it's approval`)
                for (let i = 0; i < findAdmin.length; i++) {
                    SendMail(findAdmin[i].email, "New Test Booking", `${testCategory} Test Booking`, `${findPatient.name} booked a appoinment please chech your dashboard for more details`)
                }
            }
            return booking
        }
    }
    throw new ErrorHandler("WRONG PATIENT ID IS PASSED")
}

const approvedTest = async (id, approved) => {
    if (approved) {
        let updateTest = await Screening.findByIdAndUpdate(id, { $set: { status: "Upcoming" } }, { new: true })
        if (updateTest) {
            let findPatient = await AccountModel.findById(updateTest.patientId)
            SendMail(findPatient?.email, "Test Appoinment Approved", `${updateTest.testCategory} Test Appoinment`, `${findPatient.name} your appoinment has been approved`)
            return updateTest
        }
    }
    else if (!approved) {
        let updateTest = await Screening.findByIdAndUpdate(id, { $set: { status: "Decline" } }, { new: true })
        if (updateTest) {
            let findPatient = await AccountModel.findById(updateTest.patientId)
            SendMail(findPatient?.email, "Test Appoinment Declined", `${testCategory} Test Appoinment`, `${findPatient.name} your appoinment has been declined`)
            return updateTest
        }
    }
    throw new ErrorHandler("WRONG ID IS PASSED", 404)
}

const getForLaboratry = async (labId) => {
    let find = await Screening.find({ laboratryId: labId }).populate("patientId", "-password -otp -otpVerified -admin_approved -createdAt -updatedAt -__v")
    if (find.length > 0) {
        return find
    }
    throw new ErrorHandler("No Test Found", 404)
}

const getSingle = async (id) => {
    let find = await Screening.findById(id).populate("patientId", "-password -otp -otpVerified -admin_approved -createdAt -updatedAt -__v").populate('laboratryId', '-createdAt -updatedAt -password')
    if (find) {
        return find
    }
    throw new ErrorHandler("No Test Found", 404)
}

const getForPatient = async(patientId)=>{
    let find = await Screening.find({ patientId: patientId }).populate("laboratryId", "-password -createdAt -updatedAt -__v")
    if (find.length > 0) {
        return find
    }
    throw new ErrorHandler("No Test Found", 404)
}

const getForAdmin = async () => {
    let find = await Screening.find({}).populate("patientId", "-password -otp -otpVerified -admin_approved -createdAt -updatedAt -__v").populate('laboratryId', '-createdAt -updatedAt -password')
    if (find.length > 0) {
        return find
    }
    else {
        throw new ErrorHandler("No Test Found", 404)
    }
}

const sendTestResult = async (screeningId, documents, patientId, laboratryId) => {
    let documentsURL = await firebaseChatUploading(documents)
    let create = await ScreeningResult.create({ screeningId, patientId, laboratryId, reports: documentsURL })
    if (create) {
        let findLab = await LaboratryAccount.findById(laboratryId)
        let findPatient = await AccountModel.findById(patientId)
        SendMail(findLab?.email,"Test Result Approved",`Test Result`,`The Test Report You Have Sent For ${findPatient?.name} Has Approved By Admin`)
    }
    return create
}

const getScreeningTestResult = async () => {
    let result = await ScreeningResult.find({ approved: false }).populate('patientId').populate('laboratryId')
    if (result.length > 0) {
        return result
    }
    else {
        throw new ErrorHandler("No Result Found For Approal", 404)
    }

}

const getSingleScreeningTestResult = async (id) => {
    let result = await ScreeningResult.findById(id).populate('patientId').populate('laboratryId')
    if (result) {
        return result
    }
    else {
        throw new ErrorHandler("No Result Found For Approal", 404)
    }

}

const adminApprovedResult = async (resultId,approved) => {
    if (approved){
        let updateResult = await ScreeningResult.findByIdAndUpdate(resultId, { $set: { approved: true } }, { new: true })
        if (updateResult) {
            let sendTest = await Screening.findByIdAndUpdate(updateResult.screeningId, {$set: {testResult: updateResult.reports,status: "Complete"}}, { new: true })
            if (sendTest) {
                let findPatient = await AccountModel.findById(sendTest?.patientId)
                SendMail(findPatient?.email,"Test Rsult",`${sendTest.testCategory} Test Result`,`${findPatient.name} your test result has been to your dashboard please checit it`)
                return sendTest
            }
        }
        else {
            throw new ErrorHandler("No Wrong Id Failed To Approved", 404)
        }
    }
    else{
        let deleteResult = await ScreeningResult.findByIdAndDelete(resultId)
        return {msg:"Result Decline and Deleted"}
    }
}


module.exports = { bookTest, approvedTest,getForPatient, getForAdmin, getForLaboratry, getForAdmin, getSingle, sendTestResult, getScreeningTestResult, getSingleScreeningTestResult, adminApprovedResult }