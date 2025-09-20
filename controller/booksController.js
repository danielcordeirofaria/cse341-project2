//controller/booksController.js

const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

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
    const db = getDatabase();
    const response = await db.collection('books').insertOne(book);

    if (response.acknowledged) {
      const createdBook = { _id: response.insertedId, ...book };
      res.status(201).json({ 
        message: 'Book created successfully', 
        book: createdBook });
    } else {
      res.status(500).json({ message: 'An error occurred while creating the book.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getAllBooks = async (req, res) => {
  // #swagger.description = 'Retrieve all books from the library.'
  try {
    const db = getDatabase();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getBookById = async (req, res) => {
  // #swagger.description = 'Retrieve a single book by its ID.'
  const bookId = req.params.id;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const db = getDatabase();
    const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const updateBook = async (req, res) => {
  // #swagger.description = 'Update an existing book by ID.'
  const bookId = req.params.id;
  const bookData = req.body;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const db = getDatabase();
    const response = await db.collection('books').updateOne(
      { _id: new ObjectId(bookId) },
      { $set: bookData }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (response.modifiedCount > 0) {
      if (bookData.isBorrowed === true) {
        const updatedBook = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
        return res.status(200).json({
          message: 'Book successfully borrowed.',
          bookId: updatedBook._id,
          title: updatedBook.title,
          borrowedBy: updatedBook.borrowedBy
        });
      }
      if (bookData.isBorrowed === false && bookData.borrowedBy === null) {
        // Fetch the book to include its details in the return message
        const updatedBook = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
        return res.status(200).json({ message: 'Book successfully returned.',
            bookId: updatedBook._id,
            title: updatedBook.title,
         });
      }

      res.status(200).json({ message: 'Book updated successfully.' });
    } else {
      res.status(200).json({ message: 'No changes were made to the book.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const deleteBook = async (req, res) => {
  // #swagger.description = 'Delete a book by ID.'
  const bookId = req.params.id;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  try {
    const db = getDatabase();
    const response = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Book deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};