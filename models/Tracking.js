const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackingSchema = new Schema({
    "quantity": Number,
    
});

trackingSchema.set('collection', 'tracking');

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;