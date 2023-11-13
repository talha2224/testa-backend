const appoinmentDateValidation = async(req,res,next)=>{
    let {date,hour,minute,ampm} = req.body

    const formattedDate = new Date(date); // Assuming date is in ISO format (e.g., "2023-08-12")
    const formattedTime = `${hour}:${minute} ${ampm}`; // Format time as "hour:minute AM/PM"

    const fullDateTimeString = `${formattedDate.toISOString().split('T')[0]} ${formattedTime}`;
    const appointmentDateTime = new Date(fullDateTimeString);
    const currentDate = new Date();
    
    if (currentDate > appointmentDateTime) {
        res.status(403).json({msg:"Date has passed please select another date"})
    }
    else{
        next()
    }
}

module.exports = {appoinmentDateValidation}