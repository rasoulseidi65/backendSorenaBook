const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
const TeacherSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalcode: { type: String },
    mobile: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    madrak: { type: String, required: true },
    field: { type: String, required: true },
    cv: { type: String, required: true },
    profileImage: { type: String },

},{toJSON:{virtuals:true}});
TeacherSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('Teacher', TeacherSchema);
