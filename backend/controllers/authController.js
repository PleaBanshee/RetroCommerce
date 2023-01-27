const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { json } = require("body-parser");
const sendToken = require("../utils/jwtToken");

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "avatars/maria-anderson_wmpj0l",
            url: "https://res.cloudinary.com/postalot-images/image/upload/v1674806453/samples/avatars/maria-anderson_wmpj0l.jpg",
        },
    });

    const token = user.getJwtToken();

    sendToken(user, 200, res);
});

// Login for user => /api/v1/login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body;

    // check if user entered email and password
    if (!email || !password) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    // find user in the DB
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if password is valid
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    const token = user.getJwtToken();

    sendToken(user, 200, res);
});

// Log out a user and clear cookie -> /api/v1/logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});