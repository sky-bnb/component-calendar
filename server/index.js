const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index');

const port = 3003;

app.use(express.static('./public/dist'));
app.use(bodyParser.json());

// app.get('/calendar', function(req, res){
//     console.log(req.body);
//     res.send('hello world');
// });

app.post('/calendar', (req, res) => {
    console.log("INITIALIZED POST, GOING TO DB...");
    db.addCalendar(req.body);
    res.send();
});

app.listen(port, () => console.log(`Port ${port} is listening to requests`));

