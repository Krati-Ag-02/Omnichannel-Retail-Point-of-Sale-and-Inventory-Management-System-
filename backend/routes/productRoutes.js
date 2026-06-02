import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = express.Router();

router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.post('/', protect, authorizeRoles('manager', 'admin'), createProduct);
router.put('/:id', protect, authorizeRoles('manager', 'admin'), updateProduct);
router.delete('/:id', protect, authorizeRoles('manager', 'admin'), deleteProduct);

export default router;
