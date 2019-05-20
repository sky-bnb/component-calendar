var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
// let validator = require('validator');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("Calendar Module Connection Open"));

// const getDates = (id, callback) => Calendar.find({ id }, callback);



//SCHEMA/MODEL: 

//make schema
var calendarSchema = new mongoose.Schema({
    id: String,
    dates_reserved: Array
});

//make model
var Calendar = mongoose.model('Calendar', calendarSchema);  

const addCalendar = (resObj) => {
    let calendar = new Calendar({
        id: resObj.id,
        dates_reserved: resObj.dates_reserved
    });
    calendar.save(err => {
        if (err) {
            console.log("There was an error inserting into the mongoDB :", err);
        } else {
            console.log(`Success! Listing with user_id of ${resObj.id} was added!`);
        }
    });
};

const getReservations = (id, cb) => Calendar.find({ id }, cb);


module.exports = {addCalendar, getReservations};
