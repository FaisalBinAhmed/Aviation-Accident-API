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

app.get('/registration/:regNum/:qty?', (req, res) => {
    // This endpoint returns Reports by registration number
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    const query = Report.find({ RegistrationNumber:req.params.regNum }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
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

app.get('/date/:date/:qty?', (req, res) => {
    // This endpoint returns a Report by date
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let date = req.params.date;
    date = date.replace('-', '/'); // twice for two dashes to slashes
    date = date.replace('-', '/');

    const query = Report.find({ EventDate:date }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });

});

// app.get('/location/:location/:qty?', (req, res) => {
//     // This endpoint returns a Report by location
//     let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
//     let location = req.params.location;

//     const query = Report.find({ Location:location }).sort({ 'EventId': -1 }).limit(qty);
//     query.exec((err, result) => {
//         if (err) return console.error(err);
//         res.send(result);
//     });
// });

app.get('/country/:country/:qty?', (req, res) => {
    // This endpoint returns a Report by country
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let country = req.params.country;

    const query = Report.find({ Country:country }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/latitude/:lat/:qty?', (req, res) => {
     // This endpoint returns a Report by latitude
     let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
     let lat = req.params.lat;
 
     const query = Report.find({ Latitude:lat }).sort({ 'EventId': -1 }).limit(qty);
     query.exec((err, result) => {
         if (err) return console.error(err);
         res.send(result);
     });
});

app.get('/longitude/:long/:qty?', (req, res) => {
     // This endpoint returns a Report by longitude
     let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
     let long = req.params.long;
 
     const query = Report.find({ Longitude:long }).sort({ 'EventId': -1 }).limit(qty);
     query.exec((err, result) => {
         if (err) return console.error(err);
         res.send(result);
     });
});

app.get('/airportcode/:code/:qty?', (req, res) => {
     // This endpoint returns a Report by airport code
     let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
     let code = req.params.code;
 
     const query = Report.find({ AirportCode:code }).sort({ 'EventId': -1 }).limit(qty);
     query.exec((err, result) => {
         if (err) return console.error(err);
         res.send(result);
     });
});

app.get('/airportname/:name/:qty?', (req, res) => {
     // This endpoint returns a Report by airport name
     let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
     let name = req.params.name;
 
     const query = Report.find({ AirportName:name }).sort({ 'EventId': -1 }).limit(qty);
     query.exec((err, result) => {
         if (err) return console.error(err);
         res.send(result);
     });
});

app.get('/make/:make/:qty?', (req, res) => {
    // This endpoint returns a Report by aircraft make
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let make = req.params.make;

    const query = Report.find({ Make:make }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/model/:model/:qty?', (req, res) => {
    // This endpoint returns a Report by aircraft model
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let model = req.params.model;

    const query = Report.find({ Model:model }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/numberofengines/:num/:qty?', (req, res) => {
    // This endpoint returns a Report by number of engines
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let num = req.params.num;

    const query = Report.find({ NumberOfEngines:num }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/enginetype/:type/:qty?', (req, res) => {
    // This endpoint returns a Report by engine type
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let type = req.params.type;

    const query = Report.find({ EngineType:type }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/fardescription/:far/:qty?', (req, res) => {
    // This endpoint returns a Report by far description
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let far = req.params.far;

    const query = Report.find({ FARDescription:far }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/schedule/:schedule/:qty?', (req, res) => {
    // This endpoint returns a Report by schedule
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let schedule = req.params.schedule;

    const query = Report.find({ Schedule:schedule }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/aircarrier/:carrier/:qty?', (req, res) => {
    // This endpoint returns a Report by air carrier
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let carrier = req.params.carrier;

    const query = Report.find({ AirCarrier:carrier }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/totalfatalinjuries/:fatal/:qty?', (req, res) => {
    // This endpoint returns a Report by number of fatal injuries
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let fatal = req.params.fatal;

    const query = Report.find({ TotalFatalInjuries:fatal }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/totalseriousinjuries/:serious/:qty?', (req, res) => {
    // This endpoint returns a Report by number of serious injuries
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let serious = req.params.serious;

    const query = Report.find({ TotalSeriousInjuries:serious }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/totalminorinjuries/:minor/:qty?', (req, res) => {
    // This endpoint returns a Report by number of minor injuries
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let minor = req.params.minor;

    const query = Report.find({ TotalMinorInjuries:minor }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/totaluninjured/:uninjured/:qty?', (req, res) => {
    // This endpoint returns a Report by number of uninjured
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let uninjured = req.params.uninjured;

    const query = Report.find({ TotalUninjured:uninjured }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/phaseofflight/:phase/:qty?', (req, res) => {
    // This endpoint returns a Report by phase of flight
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let phase = req.params.phase;

    const query = Report.find({ BroadPhaseOfFlight:phase }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});

app.get('/publicationdate/:date/:qty?', (req, res) => {
    // This endpoint returns a Report by publication date
    let qty = req.params.qty != null ? parseInt(req.params.qty) : 1; // quantity is 1 by default
    let date = req.params.date;
    date = date.replace('-', '/'); // twice for two dashes to slashes
    date = date.replace('-', '/');

    const query = Report.find({ PublicationDate:date }).sort({ 'EventId': -1 }).limit(qty);
    query.exec((err, result) => {
        if (err) return console.error(err);
        res.send(result);
    });
});







app.listen(port, () => console.log(`Aviation Accident API listening on port ${port}`));