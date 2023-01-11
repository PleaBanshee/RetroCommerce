const app = require("./app");
const dotenv = require('dotenv');

// Configs
dotenv.config({path: './config/config.env'});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});