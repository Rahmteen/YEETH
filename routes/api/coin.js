const express = require('express')
const yeethController = require('../../controllers/coinController.js')
const router = express.Router();

router.post('/create', yeethController.postCoin);

module.exports = router