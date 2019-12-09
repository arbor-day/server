const express = require('express');
const api = express.Router();
const db = require('../models/location.js');
const auth = require('../middleware/auth');

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
 * post
 */
api.post('/', auth, async (req, res, next) => {

  try {
    const formattedData = {
      ...req.body,
      createdBy_username: req.user.username,
      createdBy_id: req.user._id
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
api.put('/:id', auth, async (req, res) => {
  const id = typeof req.params.id === String ? req.params.id : null;
  const updateCmd = {
    $set: req.body
  };

  const updatedData = await db.updateOne(id, updateCmd);
  res.json(updatedData);
})
/**
 * delete
 */

api.delete('/:id', auth, async (req, res) => {
  const id = typeof req.params.id === String ? req.params.id : null;
  await db.deleteOne(id);
  res.json({
    message: 'successfully deleted feature'
  });
})


module.exports = api;