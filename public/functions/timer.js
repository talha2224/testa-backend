const Antenal = require('../../src/patient/antenatal/model')

const updateExpiredAppointments = async () => {
    try {
        const expiredAppointments = await Antenal.find({});
        for (const appointment of expiredAppointments) {
            const formattedDate = new Date(appointment.appointment.date);
            const formattedTime = `${appointment.appointment.hour}:${appointment.appointment.minute} ${appointment.appointment.ampm}`;
            const fullDateTimeString = `${formattedDate.toISOString().split('T')[0]} ${formattedTime}`;
            const appointmentDateTime = new Date(fullDateTimeString);
            const currentDate = new Date();
            if (currentDate > appointmentDateTime) {
                appointment.appointment.date = null;
                appointment.appointment.hour = 0;
                appointment.appointment.minute = 0;
                appointment.appointment.ampm = null;
                appointment.appointment.approved = false;
                appointment.appointment.decline = false;
                await appointment.save();
            }
        }

    } catch (error) {
        console.error('Error updating expired appointments:', error.message);
    }
};

const updatePregnancyMonths = async () => {
    try {
        const currentDate = new Date();
        const antenatalToUpdate = await Antenal.find({ createdAt: { $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) } });
        for (const antenatal of antenatalToUpdate) {
            antenatal.pregnancyMonth += 1;
            await antenatal.save();
        }
    } catch (error) {
        console.error('Error updating pregnancy months:', error.message);
    }
};

setInterval(updatePregnancyMonths, 24 * 60 * 60 * 1000);
setInterval(updateExpiredAppointments, 60 * 1000)



module.exports = { updateExpiredAppointments, updatePregnancyMonths }