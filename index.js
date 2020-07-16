const express = require('express');
const mongoose = require('mongoose');

const Report = require('./models/Report');

mongoose.connect('mongodb://localhost/ntsb', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {

});


const app = express();
const port = 5000

app.get('/', (req, res) => res.send('Hello, World!'));

app.get('/random', (req, res) => {
    // this endpoint should return a random Report
    Report.count().exec((err, count) => {
        const random = Math.floor(Math.random() * count);

        Report.findOne().skip(random).exec((err, result) => {
            if (err) return console.error(err);
            res.send(result);
        });
        
    });
    
});

app.listen(port, () => console.log(`Aviation Accident API listening on port ${port}`));