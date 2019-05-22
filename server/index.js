const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('../database/index');
const {getReservations} = require('../database/index');

const port = 3003;

server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public/dist'));
server.use(bodyParser.json());

server.post('/calendar', (req, res) => {
    db.addCalendar(req.body);
    res.send();
});

server.get('/calendar', (req, res) => {
    getReservations(req.body.id, (err, reservations) => {
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

