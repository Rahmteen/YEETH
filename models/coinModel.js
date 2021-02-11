const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

const coinSchema = new Schema({
    name: {
       type: String,
       required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

module.exports = Coin = mongoose.model('coins', coinSchema)