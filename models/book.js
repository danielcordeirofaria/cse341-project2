const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true},
  publisher: String,
  publicationDate: Date,
  genre: String,
  summary: String,
  language: String,
  pageCount: Number,
  deweyDecimal: String,
  lcc: String,
  isBorrowed: { type: Boolean, default: false },
  borrowedBy: { type: String, default: null }
});

module.exports = mongoose.model('Book', bookSchema);