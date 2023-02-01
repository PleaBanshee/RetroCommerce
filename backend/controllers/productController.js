const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const product = require("../models/product");

// create a new product --- POST /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// retrieve all products --- GET /api/v1/products?keyword=apple
// GET --- /api/v1/products?keyword=apple&category=Laptops
exports.getProducts = catchAsyncErrors(async(req, res, next) => {
    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        message: "This route displays all products in database",
        count: products.length,
        productCount,
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

// create new review --- POST /api/v1/review
exports.createProductReview = catchAsyncErrors(async(req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length; // calculate average rating

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// get all reviews --- GET /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});