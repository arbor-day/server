const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const PORT = config.PORT;

// connect to the db
const MONGODB_URI = config.MONGODB_URI;
mongoose.connect(MONGODB_URI, {useNewUrlParser:true});

// Instantiate the app
const app = express();
const publicPath = path.resolve(__dirname, 'public');

// our middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(publicPath))

// the default index
app.get("/", (req, res) => {
  res.sendFile('/')
})

// the locations routes
const locationRoutes = require('./routes/')
app.use('/api/v1/locations', locationRoutes);


// fire up the server
http.createServer(app).listen(PORT, ()=>{
  console.log(`see the magic at: http://localhost:${PORT}`)
})
