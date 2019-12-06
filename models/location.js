const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  "photo": String,
  "address": String,
  "city": String,
  "state": String,
  "borough": String,
  "neighborhood": String,
  "description": String,
  "notes": String,
  "latitude": Number,
  "longitude": Number,
  "county": String,
  "zip_code": String,
  "country": String,
  "status": String,
  "caretaker_name": String,
  "caretaker_contact": String,
})

const db = mongoose.model('locations', locationSchema);

module.exports = db;