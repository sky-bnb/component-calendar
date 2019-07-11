const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2/calendar', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("MongoDB Connected to Server"));

module.exports = { db };
