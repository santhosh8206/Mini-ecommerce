const express = require('express');
const { getProducts, getSingleProduct, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/product/:id').get(getSingleProduct);

module.exports = router;
