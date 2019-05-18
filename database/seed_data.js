const Calendar = require('../database/index');
const faker = require('faker');
const moment = require('moment');


var dummyDataGenerator = () => {

    var dateGenerator = () => {
        var arrayOfReservations = [];
        while (arrayOfReservations.length < 40) {
            var newDate = moment().add(Math.floor((Math.random() * 90) + 1), 'days').format("YYYY-MM-DD");
            if (!arrayOfReservations.includes(newDate)) {
                arrayOfReservations.push(newDate);
            }
        }
    
        return arrayOfReservations.sort();
    };

    let reservations = dateGenerator();
    console.log(reservations);

    // all users/listings will have the same dates reserved / save time
    for (let i = 101; i < 201; i++) {
        var user = {id: i, dates_reserved: reservations};
        Calendar.addCalendar(user);
    }
};

console.log(dummyDataGenerator());