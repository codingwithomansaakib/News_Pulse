const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas Connected");
    console.log("Database Name:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;