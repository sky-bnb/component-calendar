const mongoose = require('mongoose');

//make schema
const calendarSchema = new mongoose.Schema({
    id: String,
    minStay: Number,
    dates_reserved: Array
});

//make model
const Calendar = mongoose.model('Calendar', calendarSchema);

//function to insert into database
const addCalendar = (resObj) => {
    let calendar = new Calendar({
        id: resObj.id,
        minStay: resObj.minStay,
        dates_reserved: resObj.dates_reserved
    });
    calendar.save(err => {
        if (err) {
            console.log("There was an error inserting into the mongoDB :", err);
        } else {
            console.log(`User #${resObj.id} was added into the database.`);
        }
    });
};

const getReservations = (cb) => {
    return Calendar.find({}, (err, reservations) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, reservations);
        }
    });
};

const getCount = () => Calendar.estimatedDocumentCount();

module.exports = { Calendar, addCalendar, calendarSchema, getCount, getReservations };