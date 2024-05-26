// import mongoose from "mongoose";
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: false,
});
// mongoose.connect('mongodb://127.0.0.1:27017/airbnb_DB?directConnection=true');


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function () {
    console.log('successfully connected to db');
})