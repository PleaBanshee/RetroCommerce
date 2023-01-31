const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    });
});

exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {});

exports.myOrders = catchAsyncErrors(async(req, res, next) => {});

exports.allOrders = catchAsyncErrors(async(req, res, next) => {});

exports.updateOrder = catchAsyncErrors(async(req, res, next) => {});

exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {});