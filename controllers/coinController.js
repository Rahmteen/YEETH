const express = require('express');
const router = express.Router();
const db = require('mongoose').db;
let MongoClient = require('mongodb').MongoClient;
// const coinModel = require('../models/coinModel.js');
const Coin = require("../models/coinModel.js");

const yeethController = {};

yeethController.postCoin = (req, res) => {
    Coin.collection.insertMany([req.body])
    .then(result => {
        console.log(result)
        res.json(result);
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports = yeethController
























// module.exports = {
//    getCoin: function(req, res, next) => {

//    }
// }