// NB!!! Run the seeder after making configurations to the products.json file

const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDB = require("../config/database");

const products = require("../data/products");

// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDB();

// insert or delete products
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
