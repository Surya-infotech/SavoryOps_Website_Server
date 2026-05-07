const mongoose = require("mongoose");

/**
 * Connects the process default Mongoose connection to the admin database.
 * Uses ADMIN_DB_URL when set; otherwise falls back to MONGO_URI / DATABASE_URL.
 */
const connectAdminDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI ;

  if (!uri) {
    throw new Error(
      "Missing admin database URI: set ADMIN_DB_URL or MONGO_URI (or DATABASE_URL)"
    );
  }

  await mongoose.connect(uri);

  return mongoose.connection;
};

module.exports = { connectAdminDB, mongoose };
