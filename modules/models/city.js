const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CitySchema = new Schema({
    city_name: { type: String, required: true , unique:true }
})
module.exports = mongoose.model('City', CitySchema);