const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subCategoryQuestionsSchema = new Schema({
    categoryID: { type: String, required: true ,ref:'CategoryQuestions'},
    title: { type: String, required: true },

})
module.exports = mongoose.model('subCategoryQuestions', subCategoryQuestionsSchema);
