const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const ProductsSchema = new Schema({
    categoryID:{ type:mongoose.Schema.ObjectId,require, ref:'Category'},
    subCategory: { type:mongoose.Schema.ObjectId,require, ref:'subCategory'},
    title: { type: String,},
    count: { type: String },
    price: { type: Number },
    viewCount: { type: String },
    detail: { type: String },
    image: { type: String },
    offer:{type:Boolean, default:false},
    offerPercent:{type:Number,default: 0},
    offerText:{type:String},
    countSell:{type:Number,default: 0},
    topText: { type: String },
    date: { type: String },
    time:{type: String,default:'00:00:00'},
    briefFeature: { type: String },
    gallery:{type:Array},
    giftType:{type:String},
    freeSend:{type:Boolean,default:false},
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
    ref:'subCategory',
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
