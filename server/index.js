const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('../database/index'); //makes connection, so keep here, even if it's greyed out as 'not used'
const {getReservations, getCount} = require('../database/schema_model.config');

server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public/dist'));
server.use(bodyParser.json());
server.use(cors());

// server.post('/calendar', (req, res) => {
//     db.addCalendar(req.body);
//     res.status(201).res.send();
// });

//TODO: make this function work for a specific user listing, and not just get an array of all 100 users
server.get("/calendar", (req, res) => {
    
  getReservations((err, reservations) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      res.status(200);
      res.send(reservations);
    }
  });
  
});

const port = 3003;
server.listen(port, () => console.log(`Port ${port} is listening to requests.`));

