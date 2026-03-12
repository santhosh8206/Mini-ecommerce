const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    shippingAddress: String,
    products: [
        {
            productId: String,
            quantity: Number
        }
    ],
    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: String,
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);