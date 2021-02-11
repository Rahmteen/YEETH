const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// importing ".env" file with conditions set
const env = require('dotenv').config()

// setting up app and port
const app = express();
const PORT = 3000;

// MONGOOSE SERVER SETUP

// MONGO_URI -> stored in .env for privacy/security,
// const MONGO_URI = "MONGODB_LOCALHOST=mongodb://localhost:27017/yeeth"
// Set up promises with mongoose
mongoose.Promise = global.Promise;

// terniary operator to check node env for local use or when deployed to a server:
mongoose.connect(process.env.NODE_ENV == 'development' ? process.env.MONGODB_LOCALHOST : process.env.MONOG_MLAB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

mongoose.connection.on('connected', function () {
    process.env.NODE_ENV === 'production' ? 
    // for Heroku stretch feature...v
    console.log(`Mongoose default connection open to ${process.env.MONGO_MLAB}`) 
    : console.log(`Mongoose default connection open to ${process.env.MONGODB_LOCALHOST}`);
  }); 
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {
    console.log(`Mongoose default connection error: ${err}`);
  }); 
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected'); 
  });

// CONDITIONAL ROUTES

app.use(express.static('public')) // Static directory (makes public directory)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// checking to see if we're in production mode to run the server publically
if (process.env.NODE_ENV === "production") { 
    app.use(express.static("client/dist"));
}

const routes = require('./routes')

app.use(routes)

// allowing the path to the build folder to be accessible in server.js
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + '/client/dist/index.html'));
});

// ROUTES/MIDDLEWARE



app.listen(PORT, ()=> {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
})

