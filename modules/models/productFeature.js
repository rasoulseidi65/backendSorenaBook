const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const productFeatureSchema = new Schema({
    productID:{ type:Schema.Types.ObjectId,require, ref:'Product'},
    featuresID:{ type:Schema.Types.ObjectId,require, ref:'Features'},
    valueID:{ type:Schema.Types.ObjectId,require, ref:'FeaturesValue' },
},{toJSON:{virtuals:true}});
productFeatureSchema.virtual('FeaturesValue',{
    ref:'FeaturesValue',
    localField:'valueID',
    foreignField:'_id',
});
productFeatureSchema.virtual('Feature',{
    ref:'Feature',
    localField:'featuresID',
    foreignField:'_id',
});
module.exports = mongoose.model('ProductFeature', productFeatureSchema);
