import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getProfile,
  logoutUser,
  refreshToken
} from '../auth/controllers.js';
import protect from '../auth/middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logoutUser);

export default router;
