const mongoose = require("mongoose");

// connect to the MongoDB database
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

mongoose.set("strictQuery", true); // avoid deprecation warning

module.exports = connectDB;
