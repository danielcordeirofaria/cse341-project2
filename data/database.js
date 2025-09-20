// data/database.js

const dotenv = require("dotenv");
dotenv.config();
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