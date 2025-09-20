const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName').isString().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.'),
    body('lastName').isString().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.'),
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('memberSince').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Member since must be a valid date.'),
    body('membershipType').optional().isString().isIn(['Standard', 'Premium', 'Student']).withMessage('Invalid membership type.')
  ];
};

const updateUserValidationRules = () => {
    return [
      body('firstName').optional().isString().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.'),
      body('lastName').optional().isString().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.'),
      body('email').optional().isEmail().withMessage('Must be a valid email address.'),
      body('memberSince').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Member since must be a valid date.'),
      body('membershipType').optional().isString().isIn(['Standard', 'Premium', 'Student']).withMessage('Invalid membership type.')
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
  userValidationRules,
  updateUserValidationRules,
  validate,
};