const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const config = require('./config');
const PORT = config.PORT;

// connect to the db
require('./db/db');

// Instantiate the app
const app = express();
const publicPath = path.resolve(__dirname, 'public');

let whitelist;
if (process.env.NODE_ENV === 'production') {
    whitelist = [
      // add urls
      'https://focused-snyder-f15e2e.netlify.com'
    ]
} else {
    whitelist = [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
    ]
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true
}


// our middleware
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(publicPath));

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
