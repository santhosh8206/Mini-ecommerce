const OrderModel = require("../models/orderModels");

// create order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.json({ message: "Order successful", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};
