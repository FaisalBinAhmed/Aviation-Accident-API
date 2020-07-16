const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    "EventId": String,
    "InvestigationType": String,
    "AccidentNumber": String,
    "EventDate": String,
    "Location": String,
    "Country": String,
    "Latitude": String,
    "Longitude": String,
    "AirportCode": String,
    "AirportName": String,
    "InjurySeverity": String,
    "AircraftDamage": String,
    "AircraftCategory": String,
    "RegistrationNumber": String,
    "Make": String,
    "Model": String,
    "AmatuerBuilt": String,
    "NumberOfEngines": String,
    "EngineType": String,
    "FARDescription": String,
    "Schedule": String,
    "PurposeOfFlight": String,
    "AirCarrier": String,
    "TotalFatalInjuries": String,
    "WeatherCondition": String,
    "BroadPhaseOfFlight": String,
    "ReportStatus": String,
    "PublicationDate": String
});

reportSchema.set('collection', 'data');

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;