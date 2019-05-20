var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendar', { useNewUrlParser: true });
// let validator = require('validator');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("Calendar Module Connection Open"));



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
            console.log(`Success: User #${resObj.id} was added into the database`);
        }
    });
};

const getReservations = (id, cb) => Calendar.find({ id }, cb);
const getCount = () => Calendar.estimatedDocumentCount();
module.exports = {addCalendar, getReservations, getCount, db};
