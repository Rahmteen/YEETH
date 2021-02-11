const express = require('express')
const yeethController = require('../../controllers/coinController.js')
const router = express.Router();

router.post('/create', yeethController.postCoin, (req, res) => {
    res.status(200).json(req.body)
});

module.exports = router