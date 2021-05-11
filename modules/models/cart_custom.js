const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CartCustomSchema = new Schema({
    seller_id: {type:mongoose.Schema.ObjectId, required: true },
    customer_id: { type:mongoose.Schema.ObjectId, required: true },
    product_id: { type:mongoose.Schema.ObjectId, required: true },
    countProduct: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: String, required: true }
},{timestamps:true,toJSON:{virtuals:true}});
CartCustomSchema.virtual('product',{
    ref:'Products',
    localField:'product_id',
    foreignField:'_id',

});

CartCustomSchema.virtual('seller',{
    ref:'SellerUser',
    localField:'seller_id',
    foreignField:'_id',

});
CartCustomSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('CartCustom', CartCustomSchema);
