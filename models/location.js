const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  "photo": {
    type:String,
    default: null
  },
  "address": {
    type:String,
    default: null,
  },
  "city": {
    type:String,
    default: null
  },
  "state": {
    type:String,
    default: null
  },
  "borough": {
    type:String,
    default: null
  },
  "neighborhood": {
    type:String,
    default: null
  },
  "description": {
    type:String,
    default: null
  },
  "notes": {
    type:String,
    default: null
  },
  "latitude": {
    type:Number,
    default: null,
    required: true
  },
  "longitude": {
    type:Number,
    default: null,
    required: true
  },
  "county": {
    type:String,
    default: null
  },
  "zip_code": {
    type:String,
    default: null
  },
  "country": {
    type:String,
    default: null
  },
  "status": {
    type:String,
    default: 'incomplete'
  },
  "caretaker_name": {
    type:String,
    default: null
  },
  "caretaker_contact": {
    type:String,
    default: null
  },
  "createdBy_username": {
    type: String,
    required: true
  },
  "createdBy_id": {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const db = mongoose.model('locations', locationSchema);

module.exports = db;