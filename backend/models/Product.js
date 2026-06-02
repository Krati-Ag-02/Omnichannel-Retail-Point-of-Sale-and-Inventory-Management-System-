import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
      index: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, 'SKU must be at least 3 characters'],
      maxlength: [50, 'SKU cannot exceed 50 characters'],
      index: true,
      match: [/^[A-Z0-9\-]+$/, 'SKU can only contain uppercase letters, numbers, and hyphens']
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
      match: [/^[0-9]{8,14}$/, 'Barcode must be 8-14 digits']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
      enum: {
        values: ['Electronics', 'Clothing', 'Food', 'Beverages', 'Books', 'Home', 'Sports', 'Other'],
        message: 'Invalid category selected'
      }
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0,
      set: (v) => Math.round(v * 100) / 100 // Store as cents to avoid floating point issues
    },
    cost: {
      type: Number,
      min: [0, 'Cost cannot be negative'],
      default: 0,
      set: (v) => Math.round(v * 100) / 100
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
      integer: true
    },
    reorderLevel: {
      type: Number,
      min: [0, 'Reorder level cannot be negative'],
      default: 10
    },
    reorderQuantity: {
      type: Number,
      min: [1, 'Reorder quantity must be at least 1'],
      default: 50
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      index: true
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    images: [{
      url: String,
      alt: String
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================
// Text search index for full-text search
productSchema.index({ 
  name: 'text', 
  category: 'text', 
  description: 'text', 
  sku: 'text',
  tags: 'text'
});

// Compound indexes for common queries
productSchema.index({ storeId: 1, isActive: 1 });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ sku: 1, storeId: 1 });
productSchema.index({ createdAt: -1 });

// ==================== VIRTUALS ====================
/**
 * Virtual for profit margin
 */
productSchema.virtual('margin').get(function() {
  if (this.cost === 0) return 0;
  return Math.round(((this.price - this.cost) / this.price) * 100);
});

/**
 * Virtual for total inventory value
 */
productSchema.virtual('inventoryValue').get(function() {
  return Math.round(this.cost * this.stock * 100) / 100;
});

/**
 * Virtual for stock status
 */
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'OUT_OF_STOCK';
  if (this.stock <= this.reorderLevel) return 'LOW_STOCK';
  return 'IN_STOCK';
});

// ==================== MIDDLEWARE ====================
/**
 * Validate that SKU is unique during save
 */
productSchema.pre('save', async function(next) {
  try {
    // Check if SKU is already used by another product
    if (this.isModified('sku')) {
      const existingProduct = await mongoose.model('Product').findOne({
        sku: this.sku,
        _id: { $ne: this._id }
      });
      
      if (existingProduct) {
        throw new Error(`SKU "${this.sku}" is already in use`);
      }
    }

    // Validate price >= cost
    if (this.price < this.cost) {
      throw new Error('Selling price cannot be less than cost price');
    }

    // Validate reorder quantity
    if (this.reorderQuantity < 1) {
      throw new Error('Reorder quantity must be at least 1');
    }

    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Cascade delete inventory ledger entries on product delete
 */
productSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  try {
    const InventoryLedger = mongoose.model('InventoryLedger');
    await InventoryLedger.deleteMany({ product: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// ==================== METHODS ====================
/**
 * Add stock to product
 * @param {number} quantity - Quantity to add
 * @returns {object} Updated product
 */
productSchema.methods.addStock = async function(quantity) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  
  this.stock += quantity;
  return await this.save();
};

/**
 * Remove stock from product
 * @param {number} quantity - Quantity to remove
 * @returns {object} Updated product
 */
productSchema.methods.removeStock = async function(quantity) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  
  if (this.stock < quantity) {
    throw new Error(`Insufficient stock. Available: ${this.stock}, Requested: ${quantity}`);
  }
  
  this.stock -= quantity;
  return await this.save();
};

/**
 * Check if product has sufficient stock
 * @param {number} quantity - Quantity to check
 * @returns {boolean}
 */
productSchema.methods.hasStock = function(quantity) {
  return this.stock >= quantity;
};

/**
 * Check if stock is low
 * @returns {boolean}
 */
productSchema.methods.isLowStock = function() {
  return this.stock <= this.reorderLevel;
};

/**
 * Deactivate product
 */
productSchema.methods.deactivate = async function() {
  this.isActive = false;
  return await this.save();
};

/**
 * Activate product
 */
productSchema.methods.activate = async function() {
  this.isActive = true;
  return await this.save();
};

/**
 * Get product summary
 */
productSchema.methods.getSummary = function() {
  return {
    id: this._id,
    name: this.name,
    sku: this.sku,
    category: this.category,
    price: this.price,
    cost: this.cost,
    margin: this.margin,
    stock: this.stock,
    status: this.stockStatus,
    isActive: this.isActive
  };
};

// ==================== STATICS ====================
/**
 * Find product by SKU
 */
productSchema.statics.findBySku = function(sku) {
  return this.findOne({ sku: sku.toUpperCase() });
};

/**
 * Find product by barcode
 */
productSchema.statics.findByBarcode = function(barcode) {
  return this.findOne({ barcode });
};

/**
 * Search products with full-text search
 * @param {string} query - Search query
 * @param {object} filter - Additional filters
 * @returns {Promise<Array>} Matching products
 */
productSchema.statics.search = async function(query, filter = {}) {
  const searchFilter = {
    $text: { $search: query },
    isActive: true,
    ...filter
  };
  
  return this.find(
    searchFilter,
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

/**
 * Get low stock products
 */
productSchema.statics.getLowStockProducts = function(storeId = null) {
  const filter = { $expr: { $lte: ['$stock', '$reorderLevel'] }, isActive: true };
  if (storeId) {
    filter.storeId = storeId;
  }
  return this.find(filter);
};

/**
 * Get products by category
 */
productSchema.statics.getByCategory = function(category, storeId = null) {
  const filter = { category, isActive: true };
  if (storeId) {
    filter.storeId = storeId;
  }
  return this.find(filter);
};

export default mongoose.model('Product', productSchema);
