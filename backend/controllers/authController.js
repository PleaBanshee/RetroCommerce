const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { json } = require("body-parser");

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

    res.status(201).json({
        success: true,
        token,
        user,
    });
});