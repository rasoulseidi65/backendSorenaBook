const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const CommentSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String },
    text: { type: String, required: true },
    id: { type:mongoose.Schema.ObjectId, required: true },
    date:{ type: String},
    active: { type: Boolean, default: 'false' },

},{timestamps:true,toJSON:{virtuals:true}});
CommentSchema.virtual('answer',{
    ref:'Answer',
    localField:'_id',
    foreignField:'comment_Id',

});
CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentSchema);
