const mongoose = require('mongoose');
const Calendar = require('./schema_model.config');

mongoose.connect('mongodb://localhost/calendar', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("Calendar Mongoose DB Connected to Server"));

module.exports = { db };
