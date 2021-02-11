const router = require("express").Router();
const coinRoutes = require('./coin.js')

router.use('/coin', coinRoutes)

module.exports = router