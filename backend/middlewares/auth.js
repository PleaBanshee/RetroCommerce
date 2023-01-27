const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const user = require("../models/user");

// Check if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const { token } = req.cookies.token;
    if (!token) {
        return next(
            new ErrorHandler(
                "You need to be logged in first to access this page",
                401
            )
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});