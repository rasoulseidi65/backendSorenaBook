const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RatingSchema = new Schema({
    product_id: { type:mongoose.Schema.ObjectId, required: true ,ref:'Products'},
    customer_id: { type:mongoose.Schema.ObjectId, required: true },
    seller_id: { type:mongoose.Schema.ObjectId, required: true,ref:'SellerUser' },
    starcount: { type: Number, required: true }
},{timestamps:true,toJSON:{virtuals:true}});
RatingSchema.virtual('seller',{
    ref:'SellerUser',
    localField:'seller_id',
    foreignField:'_id',

});


module.exports = mongoose.model('Rating', RatingSchema);
