import mongoose from 'mongoose';

const orderLineItemSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true }
  },
  { timestamps: true }
);

orderLineItemSchema.index({ orderId: 1 });
orderLineItemSchema.index({ product: 1 });

export default mongoose.model('OrderLineItem', orderLineItemSchema);
