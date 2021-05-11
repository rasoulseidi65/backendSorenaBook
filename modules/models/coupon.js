const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
    title: {type: String, required: true},
    codeCoupon: {type: String, required: true}
})
module.exports = mongoose.model('Coupon', CouponSchema);
