const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const FeaturesValueSchema = new Schema({
    featuresID:{ type:mongoose.Schema.ObjectId,require, ref:'Features'},
    value: { type: String,},
},{toJSON:{virtuals:true}});

module.exports = mongoose.model('FeaturesValue', FeaturesValueSchema);
