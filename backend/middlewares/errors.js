const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // switch (err.name) {
  //   case "CastError": // Wrong Mongoose Object ID Error
  //     message = `Resource not found. Invalid: ${err.path}`;
  //     err = new ErrorHandler(message, 400);
  //     break;
  //   case "ValidationError": // Handling Mongoose Validation Error
  //     message = Object.values(err.errors).map((value) => value.message);
  //     err = new ErrorHandler(message, 400);
  //     break;
  //   case "JsonWebTokenError": // Handling wrong JWT error
  //     message = "JSON Web Token is invalid. Try Again!!!";
  //     err = new ErrorHandler(message, 400);
  //     break;
  //   case "TokenExpiredError": // Handling Expired JWT error
  //     message = "JSON Web Token is expired. Try Again!!!";
  //     err = new ErrorHandler(message, 400);
  //     break;
  // }

  // // Handling Mongoose duplicate key errors
  // if (err.code === 11000) {
  //   let message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  //   err = new ErrorHandler(message, 400);
  // }

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

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error.stack,
    });
  }

  // for debugging purposes
  console.log(err.stack);
};
