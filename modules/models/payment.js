const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const PaymentSchema = new Schema({
    userID: {type:mongoose.Schema.ObjectId, required: true },//کد مشتری
    resNumber:{ type: String, required: true },//شناسه پرداخت
    refID:{ type: String,},//
    price:{ type: Number, required: true },//پول شارژ
    statusPayment:{type: String, default: 'ناموفق'},//وضعیت تراکنش
    date: { type: String, required: true },//تاریخ
    time: { type: String, required: true }//ساعت
}, {toJSON: {virtuals: true}});

module.exports = mongoose.model(' Payment', PaymentSchema);
