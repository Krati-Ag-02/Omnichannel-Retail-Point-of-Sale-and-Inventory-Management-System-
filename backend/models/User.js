import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    role: {
      type: String,
      enum: {
        values: ['cashier', 'manager', 'admin'],
        message: 'Role must be cashier, manager, or admin'
      },
      default: 'cashier'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// ==================== INDEXES ====================
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// ==================== MIDDLEWARE ====================
/**
 * Pre-save middleware to hash password if modified
 */
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Pre-deleteOne middleware to cascade delete related orders
 */
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const Order = mongoose.model('Order');
    await Order.deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// ==================== METHODS ====================
/**
 * Method to compare password with hashed password
 * @param {string} enteredPassword - Password to compare
 * @returns {boolean} True if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

/**
 * Method to get user data without password
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

/**
 * Static method to find user by email and password
 */
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordMatch = await user.comparePassword(password);
  
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export default mongoose.model('User', userSchema);
