const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    stock: Number
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;