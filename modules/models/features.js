const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const FeaturesSchema = new Schema({
    titleFarsi: { type: String,},
    titleLatin: { type: String,},

},{toJSON:{virtuals:true}});
FeaturesSchema.virtual('FeaturesValue',{
    ref:'FeaturesValue',
    localField:'_id',
    foreignField:'featuresID',

});
module.exports = mongoose.model('Features', FeaturesSchema);
