import express from 'express';
import { getUsers, updateUserRole } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = express.Router();

router.use(protect, authorizeRoles('admin'));
router.get('/', getUsers);
router.put('/:id/role', updateUserRole);

export default router;
