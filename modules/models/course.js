const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const CourseSchema = new Schema({
    userID:{type:mongoose.Schema.ObjectId , ref:'CustomerUser'},
    title: { type: String, },
    categories:{type: String, },
    type: { type: String,  },//free/vip/cash
    detail: { type: String,  },
    abstract: { type: String,  },
    price: { type: String,  },
    priceSupport: { type: String,},
    image: { type: String, },
    level:{type: String,},
    titleTag:{type: String,},
    keyTag:{type: String,},
    timeCourse:{type: String,default:'00:00:00'},//زمان دوره
    sizeCourse:{type: String},
    viewCount:{type: String,default:0},//بازدید
    commentCount:{type: String,default:0},
    status:{type: Boolean,default:false},
    date:{type: String,default:'00:00:00'},
    time:{type: String,default:'00:00:00'},
},{timestamps:true,toJSON:{virtuals:true}});
CourseSchema.virtual('Episode',{
    ref:'Episode',
    localField:'_id',
    foreignField:'courseID',

});
CourseSchema.virtual('CustomerUser',{
    ref:'CustomerUser',
    localField:'userID',
    foreignField:'_id',
});
CourseSchema.virtual('Comment',{
    ref:'Comment',
    localField:'_id',
    foreignField:'id',
});
CourseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Course', CourseSchema);
