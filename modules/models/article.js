const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate=require('mongoose-paginate');
const ArticleSchema = new Schema({
    title : { type : String , required : true},
    abstract : { type : String , required : true},
    date: { type : String , required : true},
    time: { type : String , required : true},
    author : { type : String , required : true},
    image : { type :String},
    detail : { type :String,required:true},
    viewCount : { type :Number,default:0},
},{timestamps:true,toJSON:{virtuals:true}});
ArticleSchema.virtual('Comment',{
    ref:'Comment',
    localField:'_id',
    foreignField:'id',
});
ArticleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Article' , ArticleSchema);
