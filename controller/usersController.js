const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

const createUser = async (req, res) => {
  // #swagger.description = 'Create a new library user.'
  const { firstName, lastName, email, memberSince, membershipType } = req.body;

  const user = {
    firstName,
    lastName,
    email,
    memberSince: memberSince || new Date(),
    membershipType: membershipType || 'Standard'
  };

  try {
    const db = getDatabase();
    const response = await db.collection('users').insertOne(user);

    if (response.acknowledged) {
      const createdUser = { _id: response.insertedId, ...user };
      res.status(201).json({ 
        message: 'User created successfully', 
        user: createdUser 
      });
    } else {
      res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getAllUsers = async (req, res) => {
  // #swagger.description = 'Retrieve all library users.'
  try {
    const db = getDatabase();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getUserById = async (req, res) => {
  // #swagger.description = 'Retrieve a single user by ID.'
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const db = getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const updateUser = async (req, res) => {
  // #swagger.description = 'Update an existing user by ID.'
  const userId = req.params.id;
  const userData = req.body;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const db = getDatabase();
    const response = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: userData }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully.' });
    } else {
      res.status(200).json({ message: 'No changes were made to the user.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.description = 'Delete a user by ID.'
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const db = getDatabase();
    const response = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};