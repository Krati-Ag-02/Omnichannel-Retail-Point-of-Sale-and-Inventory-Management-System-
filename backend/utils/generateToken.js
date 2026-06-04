import jwt from 'jsonwebtoken';

/**
 * Generate JWT token for user authentication
 * Token expires in 7 days
 * @param {string} id - User ID to encode in token
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Generate refresh token (30 days)
 * @param {string} id - User ID to encode in token
 * @returns {string} Refresh JWT token
 */
export const generateRefreshToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: '30d',
    algorithm: 'HS256'
  });
};

export default generateToken;
