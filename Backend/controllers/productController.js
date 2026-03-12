const ProductModel = require("../models/productModels")

//Get products API  - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await ProductModel.find();
  res.json(products);
};

//Get products by category - /api/v1/products/:category
exports.getProductsByCategory = async (req, res, next) => {
  const products = await ProductModel.find({
    category: req.params.category
  });
  res.json(products);
};

//Get single product API  - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
