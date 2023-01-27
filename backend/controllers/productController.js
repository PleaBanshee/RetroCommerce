const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// create a new product --- POST /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// retrieve all products --- GET /api/v1/products?keyword=apple
// GET --- /api/v1/products?keyword=apple&category=Laptops
exports.getProducts = catchAsyncErrors(async(req, res, next) => {
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        message: "This route displays all products in database",
        count: products.length,
        products,
    });
});

// retrieve a single product --- GET /api/v1/product/:id
// check product _id in json
exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product found",
        product,
    });
});

// update a product --- PUT /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "Product updated",
        product,
    });
});

// delete a product --- DELETE /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted",
    });
});