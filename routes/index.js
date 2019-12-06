const express = require('express');

const api = express.Router();

const db = require('../models/location.js');


/**
 * get
 */
api.get('/', async (req, res) => {
  const data = await db.find();
  res.json(data);
})

/**
 * post
 */
api.post('/', async (req, res) => {
  console.log(req.body)
  const newData = await db.create(req.body)
  res.json(newData);
})

/**
 * put
 */
api.put('/:id', async (req, res)=> {
  const id = typeof req.params.id === String ? req.params.id : null;
  const updateCmd = {$set:req.body};

  const updatedData = await db.updateOne(id, updateCmd);
  res.json(updatedData);
})
/**
 * delete
 */

api.delete('/:id', async (req, res) => {
  const id = typeof req.params.id === String ? req.params.id : null;
  await db.deleteOne(id);
  res.json({message:'successfully deleted feature'});
})


module.exports = api;