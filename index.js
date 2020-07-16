const express = require('express');
const mongoose = require('mongoose');

const Report = require('./models/Report');

mongoose.connect('mongodb://localhost/ntsb', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {

});


const app = express();
const port = 5000

app.get('/', (req, res) => res.redirect('https://github.com/cwille97/Aviation-Accident-API'));

app.get('/random', (req, res) => {
    // this endpoint should return a random Report
    Report.countDocuments().exec((err, count) => {
        const random = Math.floor(Math.random() * count);

        Report.findOne().skip(random).exec((err, result) => {
            if (err) return console.error(err);
            res.send(result);
        });
        
    });
    
});

app.get('/registration/:regNum', (req, res) => {
    // This endpoint returns Reports by registration number
    Report.find({ RegistrationNumber:req.params.regNum }, (err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/eventid/:eid', (req, res) => {
    // This endpoint returns Reports by EventId
    Report.find({ EventId:req.params.eid }, (err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/accidentnumber/:anum', (req, res) => {
    // This endpoint returns Reports by AccidentNumber
    Report.find({ AccidentNumber:req.params.anum }, (err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});



app.listen(port, () => console.log(`Aviation Accident API listening on port ${port}`));