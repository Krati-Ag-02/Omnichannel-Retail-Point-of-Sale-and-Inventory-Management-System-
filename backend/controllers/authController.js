import User from '../models/User.js';
import generateToken, { generateRefreshToken, verifyToken } from '../utils/generateToken.js';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide name, email, and password' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Passwords do not match' 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const user = await User.create({
      name,
      email,
      password,
      role: 'cashier'
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and compare password using static method
    const user = await User.findByCredentials(email, password);

    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Account is inactive. Contact administrator.'
      });
    }

    // Generate token and refresh token
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(401).json({ 
      success: false,
      message: error.message || 'Invalid credentials'
    });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Profile fetch error:', error.message);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch profile'
    });
  }
};

/**
 * Refresh JWT token
 * @route POST /api/auth/refresh-token
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Get user
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    // Generate new access token
    const newToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (error) {
    console.error('Token refresh error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed'
    });
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 */
export const logoutUser = async (req, res) => {
  try {
    // Token is invalidated on client side
    // In production, you might want to maintain a blacklist

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};
