const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');
const { userValidationRules, updateUserValidationRules, validate } = require('../validators/userValidator');

// GET all users
router.get('/', usersController.getAllUsers);

// GET a single user by ID
router.get('/:id', usersController.getUserById);

// POST (create) a new user
router.post('/', userValidationRules(), validate, usersController.createUser);

// PUT (update) a user by ID
router.put('/:id', updateUserValidationRules(), validate, usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;