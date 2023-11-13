const mongoose = require('mongoose');

mongoose.set('strictPopulate',false)
const databaseConnection =async ()=>{
    let isConneced = await mongoose.connect(`mongodb+srv://talhahaider074:7j9LiABBOoJWPiLP@cluster0.eyljise.mongodb.net/Testa`)
    if (isConneced){
        console.log(`database connected`)
    }
    else{
        console.log(`database not connected`)
    }
}

module.exports = databaseConnection