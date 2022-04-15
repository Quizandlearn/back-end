const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: String,
    }
)

module.exports = mongoose.model('Category', categorySchema);