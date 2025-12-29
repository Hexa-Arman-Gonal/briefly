const { MongoClient } = require("mongodb");
require("dotenv").config();
const dbConnection = new MongoClient(process.env.dbConnectionUrl);
const dbName = process.env.dbName;

module.exports = {
  dbConnection: async () => {
    await dbConnection.connect();
    console.log("DB Connected");
    const db = dbConnection.db(dbName);
    return db;
  },
};
