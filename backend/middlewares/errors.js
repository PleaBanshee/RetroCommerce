const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;
    let message = "";

    switch (err.name) {
      case "CastError": // Wrong Mongoose Object ID Error
        message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 400);
        break;
      case "ValidationError": // Handling Mongoose Validation Error
        message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
        break;
      case "JsonWebTokenError": // Handling wrong JWT error
        message = "JSON Web Token is invalid. Try Again!!!";
        error = new ErrorHandler(message, 400);
        break;
      case "TokenExpiredError": // Handling Expired JWT error
        message = "JSON Web Token is expired. Try Again!!!";
        error = new ErrorHandler(message, 400);
        break;
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      let message = `Duplicate ${Object.keys(error.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error.stack,
    });
  }

  // for debugging purposes
  console.log(err.stack);
};
