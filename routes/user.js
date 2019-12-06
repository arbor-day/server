const express = require('express');
const api = express.Router();
const User = require('../models/user.js');
const auth = require('../middleware/auth')

/**
 * POST /users
 * create a new user
 */
api.post('/', async (req, res)=>{
  try{
    const user = new User(req.body)

    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({user, token});

  }catch(err){
    res.status(400).send(err);
  }
});

/**
 * Allow the user to login
 * with the email and password
 */
api.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findByCredentials(email, password);

    if(!user){
      return res.status(401).send({error:'login failed! check your credentials'})
    }

    const token = await user.generateAuthToken();

    res.send({user:user, token});
  }catch(err){
    res.status(400).send(err);
  }
})


/**
 * logout
 */
api.post('/me/logout', auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    })

    await req.user.save();
    res.send();
  }catch(err){
    res.status(500).send(err);
  }
})


 /**
  * logout all
  */
api.post('/me/logoutall', auth, async (req, res) => {
  try{
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * 
 */
api.get('/me', auth, async (req, res) => {
  res.send(req.user);
})

api.get('/',   async (req, res) => {
  res.json({message:'working'});
})

module.exports = api;