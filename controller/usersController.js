const User = require('../models/user');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get a single user by ID'
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }
  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete a user by ID'
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser
};