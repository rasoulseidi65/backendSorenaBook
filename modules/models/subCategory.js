const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subCategorySchema = new Schema({
    categoryID: { type: String, required: true ,ref:'Category'},
    title: { type: String, required: true },

})
module.exports = mongoose.model('subCategory', subCategorySchema);
