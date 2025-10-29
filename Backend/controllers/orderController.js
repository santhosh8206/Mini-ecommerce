const orderModel = require("../models/orderModels");
const productModel = require("../models/productModels");

// create order -/api/v1/order
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
  ).toFixed(2);
  const status = "pending";

  // updating the product  
  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id); // ✅ fixed typo + added await
    if (product) { // ✅ safety check
      product.stock = product.stock - item.qty;
      await product.save();
    }
  });

  const order = await orderModel.create({ cartItems, amount, status });
  res.json({
    success: true,
    order,
  });
};
