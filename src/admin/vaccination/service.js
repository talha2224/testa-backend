const Vaccination = require("./model");
const Order = require ('../order/model')
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const { firebaseChatUploading } = require("../../../public/configuration/firebase.config");


let postVaccinationProduct = async (title,description,price,image,quantity)=>{
    let imageUrl= await firebaseChatUploading(image)
    let createProduct = await Vaccination.create({title,description,price,image:imageUrl,quantity})
    if (createProduct){
        return createProduct
    }
}

const GetAllVaccinationProduct= async()=>{
    let findProduct = await Vaccination.find({})
    if (findProduct.length>0){
        return findProduct
    }
    else{
        throw new ErrorHandler("No Product Posted Yet",404)
    }
}

const GetSingleVaccinationProduct = async(id)=>{
    let findProduct = await Vaccination.findById(id)
    if (findProduct){
        return findProduct
    }
    else{
        throw new ErrorHandler("No Product Posted Found Wrong Id",404)
    }
}


const DeleteSingleVaccinationProduct= async(id)=>{
    let findProduct = await Vaccination.findByIdAndDelete(id)
    if (findProduct){
        return {msg:"Product Deleted",sucess:true}
    }
    else{
        throw new ErrorHandler("No Product Found Failed To Delete",404)
    }
}

const UpdateVaccinationProduct= async(id,title,description,price,image,quantity)=>{
    let findVaccinationProduct = await Vaccination.findById(id)
    if (findVaccinationProduct){
        if (image.length>0){
            let imageUrl= await firebaseChatUploading(image)
            let updatedProduct = await Vaccination.findByIdAndUpdate(id,{$set:{title,description,price,image:imageUrl,quantity}},{new:true})
            if (updatedProduct){
                return updatedProduct
            }
        }
        else{
            let updatedProduct = await Vaccination.findByIdAndUpdate(id,{$set:{title,description,price,quantity}},{new:true})
            if (updatedProduct){
                return updatedProduct
            }
        }
    }
    throw new ErrorHandler("WRONG ID",404)
}



module.exports = {postVaccinationProduct,GetAllVaccinationProduct,GetSingleVaccinationProduct,DeleteSingleVaccinationProduct,UpdateVaccinationProduct}