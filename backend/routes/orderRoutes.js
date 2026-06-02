import express from 'express';
import { createOrder, getOrders, getOrder } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('cashier', 'manager', 'admin'), createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);

export default router;
