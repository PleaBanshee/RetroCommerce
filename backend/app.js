const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/errors");
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 10000000,
  })
);
app.use(cookieParser());
app.use(fileUpload());

// Import all the routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const orders = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

app.use(errorMiddleware);

module.exports = app;
