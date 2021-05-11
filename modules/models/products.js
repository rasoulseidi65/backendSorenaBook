const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const ProductsSchema = new Schema({
    categoryID:{ type:mongoose.Schema.ObjectId,require, ref:'Category'},
    subCategory: { type:mongoose.Schema.ObjectId,require, ref:'subCategory'},
    discountID: {type: mongoose.Schema.ObjectId},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image_url: {type: Array, required: true},
}, {timestamps: true, toJSON: {virtuals: true}});

ProductsSchema.virtual('ProductFeature',{
    ref:'ProductFeature',
    localField:'_id',
    foreignField:'productID',
});
ProductsSchema.virtual('Category',{
    ref:'Category',
    localField:'categoryID',
    foreignField:'_id',
});
ProductsSchema.virtual('SubCategory',{
    ref:'SubCategory',
    localField:'subCategory',
    foreignField:'_id',
});
ProductsSchema.virtual('Inventory',{
    ref:'Inventory',
    localField:'_id',
    foreignField:'productID',
});
ProductsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Products', ProductsSchema);
