const moment = require('moment');
const { db } = require('./index');
const { Calendar } = require('./schema_model.config');

let reservations = (() => {
    var arrayOfReservations = [];

    while (arrayOfReservations.length < 175) {
        var newDate = moment().add(Math.floor((Math.random() * 365) + 1), 'days').format("YYYY-MM-DD");

        if (!arrayOfReservations.includes(newDate)) {
            arrayOfReservations.push(newDate);
        }
    }

    return arrayOfReservations.sort();
})();

//make an array of promises for 100 users 
let arrOfPromises = (() => {
    let arr = [];
    for (let i = 101; i < 201; i++) {
        let user = {
            id: i, 
            minStay: Math.floor(Math.random() * 3) + 1,
            dates_reserved: reservations
        };
        arr.push(new Promise((resolve, reject) => {
            let calendar = new Calendar({
                id: user.id,
                minStay: user.minStay,
                dates_reserved: user.dates_reserved
            });
            calendar.save(err => {
                if (err) {
                    reject(console.log("There was an error inserting into the mongoDB :", err));
                } else {
                    resolve(console.log(`User #${user.id} was added into the database.`));
                }
            });
        }));
    }
    return arr;
})();

//close connection once all users have been added
Promise.all(arrOfPromises).then(() => {
    db.close('close', () => console.log("Data Seeded. Connection Closed."));
});
