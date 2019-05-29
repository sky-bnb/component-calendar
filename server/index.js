const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('../database/index');
const {getReservations, getCount} = require('../database/schema_model.config');

const port = 3003;

server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public'));
server.use(bodyParser.json());

// server.post('/calendar', (req, res) => {
//     db.addCalendar(req.body);
//     res.status(201).res.send();
// });

server.get('/calendar', (req, res) => {
    
  getReservations((err, reservations) => {
    if (err) {
      res.status(404).
      res.end(err);
    } else {
      res.status(200);
      res.send(reservations);
    }
  });
  
});

server.listen(port, () => console.log(`Port ${port} is listening to requests`));

