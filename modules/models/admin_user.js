const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const AdminUserSchema = new Schema({
    fullName: { type: String, required: true },
    mobile: { type: String, required: false },
    password: { type: String, required: true },
    type: { type: String, default: 'admin' }
});
AdminUserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('AdminUser', AdminUserSchema);
