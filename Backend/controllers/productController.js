const productModel = require("../models/productModels")
const ProductModel = require("../models/productModels")

//Get products API  - /api/v1/products
exports.getProducts = async (req, res, next) => {
    const query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'   // ✅ fixed typo: $option → $options
        }
    } : {};

    const products = await ProductModel.find(query);
    res.json({
        success: true,
        products
    });
};

//Get single products API  - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id); // ✅ removed invalid 'ID'

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
