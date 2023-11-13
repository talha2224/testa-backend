const { firebaseChatUploading } = require("../../../public/configuration/firebase.config");
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const Product = require("./model");


const CreateProduct = async(title,description,price,image,quantity)=>{
    let imageUrl= await firebaseChatUploading(image)
    let createProduct = await Product.create({title,description,price,image:imageUrl,quantity})
    if (createProduct){
        return createProduct
    }
}

const GetAllProduct = async()=>{
    let findProduct = await Product.find({})
    if (findProduct.length>0){
        return findProduct
    }
    else{
        throw new ErrorHandler("No Product Posted Yet",404)
    }
}

const GetSingleProduct = async(id)=>{
    let findProduct = await Product.findById(id)
    if (findProduct){
        return findProduct
    }
    else{
        throw new ErrorHandler("No Product Posted Found Wrong Id",404)
    }
}

const DeleteSingleProduct = async(id)=>{
    let findProduct = await Product.findByIdAndDelete(id)
    if (findProduct){
        return {msg:"Product Deleted",sucess:true}
    }
    else{
        throw new ErrorHandler("No Product Found Failed To Delete",404)
    }
}

const UpdateProduct = async(id,title,description,price,image,quantity)=>{
    let findProduct = await Product.findById(id)
    if (findProduct){
        if (image.length>0){
            let imageUrl= await firebaseChatUploading(image)
            let updatedProduct = await Product.findByIdAndUpdate(id,{$set:{title,description,price,image:imageUrl,quantity}},{new:true})
            if (updatedProduct){
                return updatedProduct
            }
        }
        else{
            let updatedProduct = await Product.findByIdAndUpdate(id,{$set:{title,description,price,quantity}},{new:true})
            if (updatedProduct){
                return updatedProduct
            }
        }
    }
    throw new ErrorHandler("WRONG ID",404)
}


module.exports = {CreateProduct,GetAllProduct,GetSingleProduct,DeleteSingleProduct,UpdateProduct}