const app = require("./app");
const connectDB = require('./config/database');
const dotenv = require('dotenv');

// Configs
dotenv.config({path: 'backend/config/config.env'});
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
