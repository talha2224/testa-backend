const Order = require("./model");
const { ErrorHandler } = require("../../../public/middleware/Error/Handler");
const axios = require('axios');

const createOrder = async (product,vaccinationProduct, amount, userId, name, email, address) => {
  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', { amount: amount, email: email }, {
      headers: {
        Authorization: 'Bearer sk_test_8d097d1f0649bf3bc65aed07b67f5a6a14afb273',
        "Content-Type": "application/json"
      },

    }
    );
    console.log(response)
  }
  catch (error) {
    throw new ErrorHandler(error, 400)
  }
  // let createdOrder = await Order.create({ product, totalPrice, userId, name, email, address });
  // 'Authorization':`Bearer sk_test_8d097d1f0649bf3bc65aed07b67f5a6a14afb273`
  // if (createdOrder) {
  //     return createdOrder;
  // }
};


const getAllOrder = async () => {
  let orders = await Order.find({}).populate('product.productId').populate('userId')
  if (orders.length > 0) {
    return orders
  }
  else {
    throw new ErrorHandler("No Order Found", 404)
  }
}


const getSingleOrder = async (id) => {
  let orders = await Order.findById(id).populate('product.productId').populate('userId')
  if (orders) {
    return orders
  }
  else {
    throw new ErrorHandler("No Order Found Wrong Id", 404)
  }
}

const updateOrder = async () => {

}

module.exports = { createOrder, getAllOrder, getSingleOrder, updateOrder }