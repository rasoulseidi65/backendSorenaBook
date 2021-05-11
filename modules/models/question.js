const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    majorID:{type:mongoose.Schema.ObjectId,ref:'Major'},
    title: { type: String, required: true },
    price: { type: String, required: true },
    linkFile: { type: String, required: true },
    count: { type: String, required: true },
    answer:{ type: String, default:'ندارد' },
    typeQuestion:{ type: String },
    tag:{ type: String },
    text:{ type: String,},
},{toJSON:{virtuals:true}});
QuestionSchema.virtual('Major',{
    ref:'Major',
    localField:'majorID',
    foreignField:'_id',
});
module.exports = mongoose.model('Question', QuestionSchema);
