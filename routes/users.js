const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');
const { isAuthenticated } = require('../authenticate');

// GET all users
router.get('/', isAuthenticated, usersController.getAllUsers, (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get all users'
});

// GET a single user by ID
router.get('/:id', isAuthenticated, usersController.getUserById, (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a single user by ID'
});

// DELETE a user by ID
router.delete('/:id', isAuthenticated, usersController.deleteUser, (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a user by ID'
    // #swagger.description = 'Requires authentication.'
    // #swagger.security = [{"google_oauth": ["profile", "email"]}]
});

module.exports = router;