const express = require('express');
const aws = require('aws-sdk');
const api = express.Router();
const db = require('../models/location.js');
const auth = require('../middleware/auth');
const isOwner = require('../middleware/isOwner');


/**
 * get
 */
api.get('/', async (req, res, next) => {
  try {
    const data = await db.find();
    res.json(data);
  } catch (err) {
    next(err)
    // throw new Error(err);
  }

})

/**
 * get
 */
api.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await db.findById(id);
    res.json(data);
  } catch (err) {
    next(err)
    // throw new Error(err);
  }

})

/**
 * post
 */
api.post('/', auth, async (req, res, next) => {

  try {
    const formattedData = {
      ...req.body,
      createdBy_username: req.user.username,
      createdBy_id: req.user._id,
      status:undefined
    }

    const newData = await db.create(formattedData)
    res.json(newData);
  } catch (err) {
    next(err)
  }

})

/**
 * put
 */
api.put('/:id', auth, isOwner, async (req, res, next) => {
  try {
    
    const id = req.params.id;
    const updateCmd = {
      $set: req.body
    };

    const updatedData = await db.findByIdAndUpdate({_id:id}, updateCmd, {new:true});
    res.json({data:updatedData, status:'success'});
  } catch (err) {
    next(err);
  }

})
/**
 * delete
 */

api.delete('/:id', auth, isOwner, async (req, res, next) => {
  try {
    const id = req.params.id;

    await db.findByIdAndRemove({_id:id});
    
    res.json({
      status:'success',
      id:id,
      message: 'successfully deleted feature'
    });

  } catch (error) {
    next(err);
  }

})


module.exports = api;