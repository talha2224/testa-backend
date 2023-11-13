const express = require('express')
const cors = require('cors')
require('dotenv').config()
const databaseConnection = require('./public/database/dbConnection')
const { errorMiddleware, ErrorHandler } = require('./public/middleware/Error/Handler')
const { updatePregnancyMonths, updateExpiredAppointments } = require('./public/functions/timer')

// BASIC CODE SETUP
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())


//PORT CONFIGURATION
let port = process.env.PORT ||5000

// DB CONNECTION
databaseConnection()

// API ENDPOINTS

app.use('/api/v1/patient',require('./src/patient/account/Route'))               // REGISTER LOGIN UPDATE GET APIS FOR PATIENT 
app.use('/api/v1/doctor',require('./src/doctor/account/route'))                 // REGISTER LOGIN UPDATE GET APIS FOR DOCTOR 
app.use('/api/v1/chat',require('./src/chating/route'))                          // CHAT APIS WHICH IS IN B/W DOCTOR AND PATIENT
app.use('/api/v1/admin',require('./src/admin/account/route'))                   // REGISTER LOGIN UPDATE GET APIS FOR ADMIN 
app.use('/api/v1/product',require('./src/admin/product/route'))                 // ADD DELETE GET UPDATE APIS FOR TESTA SHOP 
app.use('/api/v1/order',require('./src/admin/order/route'))                     // ADD DELETE GET UPDATE APIS FOR ORDERS ALSP PAYMENT INTEGRATION 
app.use('/api/v1/antenal',require('./src/patient/antenatal/route'))             // THIS APIS IS FOR PREGNANT MOMENT WITH APPOINTMENT 
app.use('/api/v1/vital-sign',require('./src/patient/vital/route'))              // THIS APIS IS FOR PREGNANT MOMENT WITH APPOINTMENT 
app.use('/api/v1/laboratry',require('./src/laboratry/account/route'))           // THIS APIS IS FOR REGISTERING LABORATRY WITH CRUD 
app.use('/api/v1/screening',require('./src/laboratry/screening/route'))         // THIS APIS IS FOR TESTA SCREENING WITH CRUD 
app.use('/api/v1/vaccination/product',require('./src/admin/vaccination/route')) // ADD DELETE GET UPDATE APIS FOR PRODUCTS 
app.use('/api/v1/prescription',require('./src/patient/prescription/route'))     // CRUD APIS FOR PATIENT PRESCRIPTION ADDED BY DOCTOR
app.use('/api/v1/donation',require('./src/funding/route'))                      // CRUD APIS FOR TEST DONATION
app.use('/api/v1/hospital',require('./src/hospital/route'))                     // LOGIN REGISTER UPDATE GET DELETE API'S FOR HOSPITAL
app.use('/api/v1/emergency',require('./src/emergency/account/route'))           // LOGIN REGISTER UPDATE GET DELETE API'S FOR EMERGECY AMBULANCE PROVIDER
app.use('/api/v1/service',require('./src/emergency/request/route'))             //EMERGECY AMBULANCE SERVICE APIS









//TIMER
updatePregnancyMonths()
updateExpiredAppointments()

// ERROR HANDLER
app.use(errorMiddleware)
app.use((req, res, next) => {
  next(new ErrorHandler("API Not found", 404));
});

// LISTENING
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})
