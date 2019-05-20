const Calendar = require('../database/index');
const faker = require('faker');
const moment = require('moment');

//Running script will run this IIFE to generate all 100 users;
(() => {
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
    for (let i = 101; i < 201; i++) {
        let user = {id: i, dates_reserved: reservations};
        Calendar.addCalendar(user);
    }
})();
