const Product = require("../models/Product");

// create a new product --- POST /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// retrieve all products --- GET /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "This route displays all products in database",
    count: products.length,
    products,
  });
};

// retrieve a single product --- GET /api/v1/product/:id
// check product _id in json
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product found",
    product,
  });
};
