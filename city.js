const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weatherCity = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    updatedAt: Date
})

const City = mongoose.model('City', weatherCity)

module.exports = City
