// Errror handler Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Log to console for dev
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;