import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String },
    code: { type: String, unique: true, required: true, uppercase: true, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

storeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const mongooseModel = mongoose.model('Product');
  const InventoryLedger = mongoose.model('InventoryLedger');
  const Order = mongoose.model('Order');

  await mongooseModel.deleteMany({ storeId: this._id });
  await InventoryLedger.deleteMany({ store: this._id });
  await Order.deleteMany({ storeId: this._id });
  next();
});

export default mongoose.model('Store', storeSchema);
