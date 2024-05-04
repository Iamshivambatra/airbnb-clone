// import mongoose from "mongoose";
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function () {
    console.log('successfully connected to db');
})