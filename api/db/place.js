const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    address: String,
    description: String,
    perks: [String],
    photos: [String],
    extrainfo: String,
    checkin: Number,
    checkout: Number,
    maxguests: Number,
    price: Number,
});

const Placemodel = mongoose.model('Place', PlaceSchema);

module.exports = Placemodel;