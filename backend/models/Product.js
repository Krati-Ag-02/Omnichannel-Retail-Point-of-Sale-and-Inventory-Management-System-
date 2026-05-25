const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 0 },
    barcode: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
