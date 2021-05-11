const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const ProductsSchema = new Schema({
    seller_id:{type:mongoose.Schema.ObjectId,required:true},
    category_name: { type: String, required: true },
    sub_category: {type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    metric: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: Array, required: true },
    materials:{type: String, required: true},
},{timestamps:true,toJSON:{virtuals:true}});


ProductsSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'product_Id',

});
ProductsSchema.virtual('ratings',{
    ref:'Rating',
    localField:'_id',
    foreignField:'product_id',

});
ProductsSchema.virtual('seller',{
    ref:'SellerUser',
    localField:'seller_id',
    foreignField:'_id',

});
ProductsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Products', ProductsSchema);
