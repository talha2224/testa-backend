const {donation,donationPost} = require("./model");
const { ErrorHandler } = require("../../public/middleware/Error/Handler");
const { firebaseChatUploading } = require("../../public/configuration/firebase.config");

// CREATE DONATION
const createDonationPost = async(createdBy,donationRequried,images,heading,para,location)=>{
    let imageUrl = await firebaseChatUploading(images)
    let createDoantionPost = await donationPost.create({createdBy,donationRequried,images:imageUrl,heading,para,location})
    return createDoantionPost
}
const approvedPost = async(id,approved)=>{
    if(approved){
        let approvedPost = await donationPost.findByIdAndUpdate(id,{$set:{approved}},{new:true})
        return approvedPost
    }
    else{
        let declinePost = await donationPost.findByIdAndDelete(id)
        if (declinePost){
            return {msg:"POST DECLINE"}
        }
        else{
            throw new ErrorHandler("WRONG ID PASSED",404)
        }
    }
}
const getAllDonationPost = async ()=>{
    let getDonation = await donationPost.find({approved:true}).sort({createdAt:-1}).populate("createdBy")
    if (getDonation.length>0){
        return getDonation
    }
    throw new ErrorHandler("No One Donated Yet",404)
}
const getAllDonationPostForAdmin = async ()=>{
    let getDonation = await donationPost.find({}).sort({createdAt:-1}).populate("createdBy")
    if (getDonation.length>0){
        return getDonation
    }
    throw new ErrorHandler("No One Donated Yet",404)
}
const getSingleDonationPost = async(id)=>{
    let getDonation = await donationPost.findById(id).populate("createdBy")
    if (getDonation){
        return getDonation
    }
    throw new ErrorHandler("Wrong Id Failed To Get",404)
}
const deleteDonationPost = async(id)=>{
    let delDonation = await donationPost.findByIdAndDelete(id)
    if (delDonation){
        return {msg:"Donation Post Deleted"}
    }
    throw new ErrorHandler("Wrong Id Failed To Delete",404)
}
const updateDonationPost = async (id,images,heading,para)=>{
    if (images.length>0){
        let imageUrl = await firebaseChatUploading(images)
        let updatePost = await donationPost.findByIdAndUpdate(id,{$set:{heading,para,images:imageUrl}},{new:true})
        return updatePost
    }
    else{
        let updatePost = await donationPost.findByIdAndUpdate(id,{$set:{heading,para}},{new:true})
        return updatePost
    }
}


// SEND DONATION
const sendDonation = async (name,email,donatingAmount,donatedTo)=>{
    let find = await donationPost.findById(donatedTo)
    if(find){
        let Donate = await donation.create({name,email,donatingAmount,donatedTo})
        let updatePost = await donationPost.findByIdAndUpdate(donatedTo,{$set:{donationRaised:find.donationRaised+donatingAmount}},{new:true})
        return Donate
    }
    throw new ErrorHandler("Wrong donatedTo Id Paases Failed To Donate",404)

}
const getAllDonation = async (donatedTo)=>{
    let getDonation = await donation.find({donatedTo:donatedTo}).sort({createdAt:-1})
    if (getDonation.length>0){
        return getDonation
    }
    throw new ErrorHandler("No One Donated Yet",404)
}

const getSingleDonation = async (id)=>{
    let getDonation = await donation.findById(id)
    if (getDonation){
        return getDonation
    }
    throw new ErrorHandler("Wrong Id Failed To Get",404)
}
const deleteDonation = async(id)=>{
    let delDonation = await donation.findByIdAndDelete(id)
    if (delDonation){
        return {msg:"Donation Deleted"}
    }
    throw new ErrorHandler("Wrong Id Failed To Delete",404)
}



module.exports = {createDonationPost,approvedPost,getAllDonationPost,getAllDonationPostForAdmin,getSingleDonationPost,deleteDonationPost,updateDonationPost,sendDonation,getAllDonation,getSingleDonation,deleteDonation}