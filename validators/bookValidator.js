//validators/bookValidator.js

const { body, validationResult } = require('express-validator');

// Rules for creating a book
const bookValidationRules = () => {
  return [
    // title must not be empty and have at least 3 chars
    body('title').notEmpty().withMessage('Title is required.'),
    // author must not be empty and have at least 3 chars
    body('author').notEmpty().withMessage('Author is required.'),
    // isbn must be a valid ISBN
    body('isbn').notEmpty().withMessage('ISBN is required.').isISBN().withMessage('Must be a valid ISBN.'),
    // genre must not be empty
    body('genre').optional().isString(),
    // publicationDate must be a valid date if it exists
    body('publicationDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Publication date must be a valid date.'),
    // pageCount must be an integer if it exists
    body('pageCount').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Page count must be a positive integer.'),
    // isBorrowed must be a boolean if provided
    body('isBorrowed').optional().isBoolean().withMessage('isBorrowed must be a boolean value (true or false).')
  ];
};

// Rules for updating a book (all fields are optional)
const updateBookValidationRules = () => {
  return [
    // title must not be empty and have at least 3 chars if provided
    body('title').optional().isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.'),
    // author must not be empty and have at least 3 chars if provided
    body('author').optional().isString().isLength({ min: 3 }).withMessage('Author must be at least 3 characters long.'),
    // isbn must be a valid ISBN if provided
    body('isbn').optional().isISBN().withMessage('Must be a valid ISBN.'),
    // publicationDate must be a valid date if it exists
    body('publicationDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Publication date must be a valid date.'),
    // pages must be an integer if it exists
    body('pageCount').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Page count must be a positive integer.'),
    // isBorrowed must be a boolean if provided
    body('isBorrowed').optional().isBoolean().withMessage('isBorrowed must be a boolean value (true or false).')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = {
  bookValidationRules,
  updateBookValidationRules,
  validate,
};
