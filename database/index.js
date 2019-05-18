var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
let validator = require('validator');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

//make schema
var calendarSchema = new mongoose.Schema({
    id: String,
    dates_reserved: Array
});


//make model
var Calendar = mongoose.model('Calendar', calendarSchema);  

//make instances of model that are reservations
const addCalendar = (resObj) => {
    // all users/listings will have the same dates reserved / save time
    let calendar = new Calendar({
        id: resObj.id,
        dates_reserved: resObj.dates_reserved
    });
    calendar.save(err => {
        if (err) {
            console.log("Hey there was an error inserting into the mongoDB :", err);
        } else {
            console.log("Success! 1 listing added!");
        }
    });
    // var calendar = new Calendar({
    //     id: resObj.id,
    //     dates_reserved: resObj.dates_reserved
    // });
    // calendar.save( (err) => {
    //     if (err) {
    //         console.log("error in saving to db: ", err);
    //     } else {
    //         console.log("We've inserted!");
    //     }
    // });
};


module.exports.addCalendar = addCalendar;
