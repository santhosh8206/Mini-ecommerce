const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    products: [
        {
            productId: String,
            quantity: Number
        }
    ],
    totalAmount: Number,
    paymentStatus: String,
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);