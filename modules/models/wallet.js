const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');


const WalletSchema = new Schema({
    customer_id: {type:mongoose.Schema.ObjectId, required: true },//کد مشتری
    Inventory: {type:Number, required: true },//موجودی
    resNumber:{ type: String, required: true },
});
WalletSchema.virtual('payments',{
    ref:'Payment',
    localField:'customer_id',
    foreignField:'customer_id',
});

module.exports = mongoose.model(' Wallet', WalletSchema);
