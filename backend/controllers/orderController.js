import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import OrderLineItem from '../models/OrderLineItem.js';
import InventoryLedger from '../models/InventoryLedger.js';
import Store from '../models/Store.js';

const generateOrderNumber = () => `ORD-${Date.now()}`;

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { products, totalAmount, paymentMethod, storeId } = req.body;
    if (!products || !products.length) {
      throw new Error('Cart cannot be empty');
    }
    if (!storeId) {
      throw new Error('Store ID is required');
    }

    const lineItemDocs = [];
    const ledgerEntries = [];
    const store = await Store.findById(storeId).session(session);
    if (!store) throw new Error('Store not found');

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new Error('Product not found');
      if (product.quantity < item.quantity) throw new Error(`Insufficient stock for ${product.productName}`);

      product.quantity -= item.quantity;
      await product.save({ session });

      lineItemDocs.push({
        product: product._id,
        name: product.productName,
        quantity: item.quantity,
        price: product.price,
        subtotal: product.price * item.quantity
      });

      ledgerEntries.push({
        store: store._id,
        product: product._id,
        quantityChange: -item.quantity,
        type: 'sale',
        reason: 'Order sold',
        order: null
      });
    }

    const [order] = await Order.create(
      [
        {
          userId: req.user._id,
          storeId: store?._id || products[0]?.storeId,
          orderNumber: generateOrderNumber(),
          totalAmount,
          paymentMethod,
          status: 'paid'
        }
      ],
      { session }
    );

    for (const entry of ledgerEntries) {
      entry.order = order._id;
    }

    const savedLineItems = await OrderLineItem.insertMany(
      lineItemDocs.map((item) => ({ ...item, orderId: order._id })),
      { session }
    );

    order.lineItems = savedLineItems.map((item) => item._id);
    await order.save({ session });
    await InventoryLedger.insertMany(ledgerEntries, { session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('lineItems')
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('lineItems');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
