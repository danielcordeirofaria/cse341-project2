// controllers/booksController.js

const Book = require('../models/book');
const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const createBook = async (req, res) => {
  // #swagger.description = 'Create a new book in the library.'
  const { title, author, isbn, publisher, publicationDate, genre, summary, language, pageCount, deweyDecimal, lcc } = req.body;

  const book = {
    title,
    author,
    isbn,
    publisher,
    publicationDate,
    genre,
    summary,
    language,
    pageCount,
    deweyDecimal,
    lcc,
    isBorrowed: false,
    borrowedBy: null
  };

  try {
    const newBook = new Book(book);
    const savedBook = await newBook.save();

    res.status(201).json({
      message: 'Book created successfully',
      book: savedBook
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  // #swagger.description = 'Retrieve all books from the library.'
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  // #swagger.description = 'Retrieve a single book by its ID.'
  const bookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const book = await Book.findById(bookId);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  // #swagger.description = 'Update an existing book by ID.'
  const bookId = req.params.id;
  const bookData = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: bookData },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (bookData.isBorrowed === true) {
      return res.status(200).json({
        message: 'Book successfully borrowed.',
        bookId: updatedBook._id,
        title: updatedBook.title,
        borrowedBy: updatedBook.borrowedBy
      });
    }
    if (bookData.isBorrowed === false && bookData.borrowedBy === null) {
      return res.status(200).json({
        message: 'Book successfully returned.',
        bookId: updatedBook._id,
        title: updatedBook.title
      });
    }

    res.status(200).json({ message: 'Book updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  // #swagger.description = 'Delete a book by ID.'
  const bookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const book = await Book.findByIdAndDelete(bookId);

    if (book) {
      res.status(200).json({ message: 'Book deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};