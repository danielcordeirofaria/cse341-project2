// routes/books.js
const express = require('express');
const router = express.Router();

const booksController = require('../controller/booksController');
const { bookValidationRules, updateBookValidationRules, validate } = require('../validators/bookValidator');
const { isAuthenticated } = require('../authenticate');

// GET all books
router.get('/', isAuthenticated, booksController.getAllBooks, (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Get all books'
});

// GET a single book by ID
router.get('/:id', isAuthenticated, booksController.getBookById, (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Get a single book by ID'
});

// POST (create) a new book
router.post('/', isAuthenticated, bookValidationRules(), validate, booksController.createBook, (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Create a new book'
    // #swagger.description = 'Requires authentication.'
});

// PUT (update) a book by ID
router.put('/:id', isAuthenticated, updateBookValidationRules(), validate, booksController.updateBook, (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Update a book by ID'
    // #swagger.description = 'Requires authentication.'
});

// DELETE a book by ID
router.delete('/:id', isAuthenticated, booksController.deleteBook, (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Delete a book by ID'
    // #swagger.description = 'Requires authentication.'
});

module.exports = router;
