const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Nom de la catégorie
    description: { type: String }, // Description optionnelle
    createdAt: { type: Date, default: Date.now }, // Date de création
});

module.exports = mongoose.model('Category', categorySchema);
