const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const InventorySchema = new Schema({
    productID: { type:mongoose.Schema.ObjectId,require},
    count: { type: Number },
    // date: { type: String },
    // time:{type: String,default:'00:00:00'},
},{timestamps:true,toJSON:{virtuals:true}});
InventorySchema.virtual('product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',
});
module.exports = mongoose.model('Inventory', InventorySchema);
