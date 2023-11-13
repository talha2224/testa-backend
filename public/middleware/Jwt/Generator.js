const jwt = require('jsonwebtoken')

const tokenGenerator = async(payloadObject)=>{
    let createdToken = await jwt.sign({ payloadObject }, process.env.JWTSECRETKEY);
    return createdToken
}

module.exports = {tokenGenerator}