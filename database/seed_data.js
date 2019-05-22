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
        let user = {id: i, minStay: Math.floor(Math.random() * 3) + 1, dates_reserved: reservations};
        Calendar.addCalendar(user);
    }
})();

const dummyUser = [
    {
        "dates_reserved": [
            "2019-05-21",
            "2019-05-22",
            "2019-05-24",
            "2019-05-27",
            "2019-06-01",
            "2019-06-02",
            "2019-06-04",
            "2019-06-06",
            "2019-06-10",
            "2019-06-13",
            "2019-06-15",
            "2019-06-17",
            "2019-06-22",
            "2019-06-23",
            "2019-06-25",
            "2019-06-28",
            "2019-06-29",
            "2019-06-30",
            "2019-07-01",
            "2019-07-04",
            "2019-07-05",
            "2019-07-07",
            "2019-07-15",
            "2019-07-16",
            "2019-07-17",
            "2019-07-19",
            "2019-07-20",
            "2019-07-21",
            "2019-07-24",
            "2019-07-25",
            "2019-07-26",
            "2019-07-27",
            "2019-07-30",
            "2019-08-04",
            "2019-08-05",
            "2019-08-06",
            "2019-08-09",
            "2019-08-10",
            "2019-08-13",
            "2019-08-14"
        ],
        "_id": "5ce3459618cc490491b066e6",
        "id": "108",
        "minStay": 2,
        "__v": 0
    }
];
export default dummyUser;
