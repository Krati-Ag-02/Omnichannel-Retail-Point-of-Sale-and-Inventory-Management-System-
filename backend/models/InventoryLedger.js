import mongoose from 'mongoose';

const inventoryLedgerSchema = new mongoose.Schema(
  {
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    quantityChange: { type: Number, required: true },
    type: { type: String, enum: ['sale', 'restock', 'adjustment', 'return'], required: true },
    reason: { type: String, trim: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  },
  { timestamps: true }
);

inventoryLedgerSchema.index({ store: 1, product: 1, createdAt: -1 });

export default mongoose.model('InventoryLedger', inventoryLedgerSchema);
