const mongoose = require('mongoose');

const getMongoUri = () => {
  const uri = process.env.MONGO_URI || ''
  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return uri
  }
  return 'mongodb://127.0.0.1:27017/smartpos'
}

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri()
    await mongoose.connect(mongoUri)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
};

module.exports = connectDB;
