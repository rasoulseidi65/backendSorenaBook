const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountrySchema = new Schema({
    country_name: { type: String, required: true }
})
module.exports = mongoose.model('Country', CountrySchema);