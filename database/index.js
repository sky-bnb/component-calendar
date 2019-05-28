const mongoose = require('mongoose');
const Calendar = require('./schema_model.config');

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/calendar', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("Calendar Mongoose DB Connected to Server"));

const getReservations = (id, cb) => Calendar.find({ id }, cb);
const getCount = () => Calendar.estimatedDocumentCount();

module.exports = {getReservations, getCount, db};
