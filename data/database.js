// data/database.js

// Load environment variables from .env file only if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized!");
    return callback(null, database);
  }
  mongoClient
    .connect(process.env.MONGODB_URI)
    .then((client) => {
    database = client.db();
    callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};