import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', index: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    lineItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderLineItem' }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card', 'digital'], default: 'cash' },
    status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'paid' }
  },
  { timestamps: true }
);

orderSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const OrderLineItem = mongoose.model('OrderLineItem');
  const InventoryLedger = mongoose.model('InventoryLedger');

  await OrderLineItem.deleteMany({ orderId: this._id });
  await InventoryLedger.deleteMany({ order: this._id });
  next();
});

export default mongoose.model('Order', orderSchema);
