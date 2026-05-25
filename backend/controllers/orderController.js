const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { products, totalAmount, paymentMethod } = req.body;
    if (!products || !products.length) {
      throw new Error('Cart cannot be empty');
    }

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new Error('Product not found');
      if (product.quantity < item.quantity) throw new Error(`Insufficient stock for ${product.productName}`);
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    const [order] = await Order.create([
      { products, totalAmount, paymentMethod, userId: req.user.id }
    ], { session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
