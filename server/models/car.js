// server/models/Car.js

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: Number,
    brand: String,
    rating: Number,
    bikeName: String,
    imgUrl: String,
    model: String,
    price: Number,
    speed: String,
    gps: String,
    fueltype: String,
});

module.exports = mongoose.model('Car', carSchema);
