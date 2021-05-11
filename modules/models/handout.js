const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  HandOutSchema = new Schema({
    majorID:{type:mongoose.Schema.ObjectId,ref:'Major'},
    title: { type: String, required: true },
    price: { type: String, required: true },
    linkFile: { type: String, required: true },
    countPage: { type: String, required: true },
    author:{ type: String, },
    section:{ type: String },
    text:{ type: String,},
},{toJSON:{virtuals:true}});
HandOutSchema.virtual('Major',{
    ref:'Major',
    localField:'majorID',
    foreignField:'_id',
});
module.exports = mongoose.model('Handout', HandOutSchema);
