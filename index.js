const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')
const config = require('./config');
const PORT = config.PORT;

// connect to the db
require('./db/db');

// Instantiate the app
const app = express();
const publicPath = path.resolve(__dirname, 'public');

// our middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(publicPath))

/****************************
 * your authentication 
 ****************************/
// const challengeAuth = basicAuth({
//   authorizer: myAuthorizer,
//   challenge: true,
//   unauthorizedResponse:getUnauthorizedResponse
// })
// //Custom authorizer checking if the username starts with 'A' and the password with 'secret'
// function myAuthorizer(username, password) {
//   return username == config.USERNAME && password == config.PASSWORD
// }
// function getUnauthorizedResponse(req) {
//   return 'not authorized'
// }


// the default index
app.get("/", (req, res) => {
  res.sendFile('/')
})

const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/location')

// user routes
app.use('/api/v1/users', userRoutes);
// the locations routes
app.use('/api/v1/locations', locationRoutes);


// fire up the server
http.createServer(app).listen(PORT, ()=>{
  console.log(`see the magic at: http://localhost:${PORT}`)
})
