const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');


const AnswerSchema = new Schema({
    name: { type: String, required: true },
    replay: { type: String, required: true },
    date: { type: String, required: true },
    comment_Id: { type:mongoose.Schema.ObjectId, required: true ,ref:'Comment'},
    time: { type: String, required: true }
})

AnswerSchema.plugin(timestamps);
AnswerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Answer', AnswerSchema);
