const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SliderSchema = new Schema({
    title: { type: String},
    caption: { type: String },
    imageurl: { type: String, required: true }
})
module.exports = mongoose.model('Slider', SliderSchema);
