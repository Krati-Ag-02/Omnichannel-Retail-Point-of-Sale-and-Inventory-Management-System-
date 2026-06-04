import mongoose from 'mongoose';

/**
 * Get MongoDB connection URI
 * Supports both MongoDB Atlas and local MongoDB
 */
const getMongoUri = () => {
  const uri = process.env.MONGO_URI || '';
  
  // If a valid MongoDB URI is provided via environment variable, use it
  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return uri;
  }
  
  // Default to local MongoDB
  const dbName = process.env.DB_NAME || 'smartpos';
  return `mongodb://127.0.0.1:27017/${dbName}`;
};

/**
 * Connect to MongoDB using Mongoose
 * Supports MongoDB Atlas connection strings via MONGO_URI environment variable
 */
const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();
    
    const connectionOptions = {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoUri, connectionOptions);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Exit process only if not in development/test mode
    if (process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
    
    throw error;
  }
};

/**
 * Handle connection events
 */
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error Event:', err.message);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB Reconnected');
});

export default connectDB;
