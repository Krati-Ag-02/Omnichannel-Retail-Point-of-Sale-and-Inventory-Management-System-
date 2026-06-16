import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: 'No authorization token provided' });
    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Invalid authorization format. Use: Bearer <token>' });

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token has expired', code: 'TOKEN_EXPIRED' });
      if (jwtError.name === 'JsonWebTokenError') return res.status(401).json({ success: false, message: 'Invalid token' });
      throw jwtError;
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.isActive) return res.status(403).json({ success: false, message: 'User account is inactive' });

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
  }
};

export const optionalProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive) req.user = user;
    } catch (e) {
      // ignore invalid token in optional protect
    }
    next();
  } catch (error) {
    next();
  }
};

export default protect;