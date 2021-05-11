const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const BasketSchema = new Schema({
    userID: {type: mongoose.Schema.ObjectId},
    productID: {type: mongoose.Schema.ObjectId},
    resNumber: {type: String, required: true},//شناسه پرداخت
    refID: {type: String},
    price: {type: String},
    offerPercent: {type: String},
    priceAll: {type: String},
    statusProduct: {type: String},
    date: {type: String, default: '0000/00/00'},
    success: {type: String, default: 'ناموفق'},
    time: {type: String, default: '00:00:00'},
}, {toJSON: {virtuals: true}});

BasketSchema.virtual('user', {
    ref: 'CustomerUser',
    localField: 'userID',
    foreignField: '_id',

});
BasketSchema.virtual('payment', {
    ref: 'Payment',
    localField: 'userID',
    foreignField: 'userID',

});
BasketSchema.virtual('course', {
    ref: 'Course',
    localField: 'productID',
    foreignField: '_id',

});
BasketSchema.virtual('Question', {
    ref: 'Question',
    localField: 'productID',
    foreignField: '_id',

});
module.exports = mongoose.model('Basket', BasketSchema);
