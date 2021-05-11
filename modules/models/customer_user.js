const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
const CustomerUserSchema = new Schema({
    email: { type: String },//ایمیل
    firstName: { type: String },//نام
    lastName: { type: String},//نام خانوادگی
    address: { type: String},//آدرس کامل
    profile: { type: String},//عکس پروفایل
    city: { type: String},//شهر
    state: { type: String},//استان
    postalCode: { type: String},//استان
    cardNumber:{type: String},
    accountNumber:{type: String},
    shabaNumber:{type: String},
    password: { type: String, required: true },//رمز
    mobile: { type: String, required: true },//شماره موبایل


});
CustomerUserSchema.plugin(mongoosePaginate);
CustomerUserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('CustomerUser', CustomerUserSchema);
