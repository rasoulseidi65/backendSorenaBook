const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProvinceSchema = new Schema({
    province_name: { type: String, required: true }
})
module.exports = mongoose.model('Province', ProvinceSchema);