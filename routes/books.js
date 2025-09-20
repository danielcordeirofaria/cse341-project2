// routes/books.js
const express = require('express');
const router = express.Router();

const booksController = require('../controller/booksController');

// GET all books
router.get('/', booksController.getAllBooks);

// GET a single book by ID
router.get('/:id', booksController.getBookById);

// POST (create) a new book
router.post('/', booksController.createBook);

// PUT (update) a book by ID
router.put('/:id', booksController.updateBook);

// DELETE a book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
