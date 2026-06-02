/**
 * Valid roles in the system
 */
const VALID_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CASHIER: 'cashier'
};

/**
 * Role hierarchy - higher index = higher privileges
 */
const ROLE_HIERARCHY = {
  [VALID_ROLES.CASHIER]: 0,
  [VALID_ROLES.MANAGER]: 1,
  [VALID_ROLES.ADMIN]: 2
};

/**
 * Authorize middleware - Check if user has one of the required roles
 * @param {...string} roles - Allowed roles
 * @returns {Function} Express middleware
 * 
 * Usage: router.post('/api/products', protect, authorizeRoles('admin', 'manager'), createProduct)
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          code: 'NOT_AUTHENTICATED'
        });
      }

      // Validate roles parameter
      if (!roles || roles.length === 0) {
        console.warn('authorizeRoles called without any roles specified');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error'
        });
      }

      // Check if user's role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        console.warn(
          `Access denied: User ${req.user.email} (${req.user.role}) tried to access resource requiring roles: ${roles.join(', ')}`
        );
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
          code: 'FORBIDDEN',
          requiredRoles: roles,
          userRole: req.user.role
        });
      }

      // User has required role, proceed
      next();
    } catch (error) {
      console.error('RBAC authorization error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Authorization error',
        code: 'AUTH_ERROR'
      });
    }
  };
};

/**
 * Authorize by minimum role level
 * @param {string} minRole - Minimum required role
 * @returns {Function} Express middleware
 * 
 * Usage: router.delete('/api/users/:id', protect, authorizeByLevel('admin'), deleteUser)
 * This allows admin and any role with higher level (if added in future)
 */
export const authorizeByLevel = (minRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          code: 'NOT_AUTHENTICATED'
        });
      }

      const userLevel = ROLE_HIERARCHY[req.user.role];
      const requiredLevel = ROLE_HIERARCHY[minRole];

      if (userLevel === undefined) {
        console.error(`Invalid user role: ${req.user.role}`);
        return res.status(500).json({
          success: false,
          message: 'Server error'
        });
      }

      if (requiredLevel === undefined) {
        console.error(`Invalid required role: ${minRole}`);
        return res.status(500).json({
          success: false,
          message: 'Server error'
        });
      }

      if (userLevel < requiredLevel) {
        console.warn(
          `Access denied: User ${req.user.email} (${req.user.role}) does not meet minimum role level ${minRole}`
        );
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
          code: 'FORBIDDEN',
          minimumRole: minRole,
          userRole: req.user.role
        });
      }

      next();
    } catch (error) {
      console.error('RBAC level authorization error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Authorization error',
        code: 'AUTH_ERROR'
      });
    }
  };
};

/**
 * Authorize admin only
 * Convenience middleware for admin-only routes
 * 
 * Usage: router.post('/api/system/settings', protect, authorizeAdmin, updateSettings)
 */
export const authorizeAdmin = authorizeRoles(VALID_ROLES.ADMIN);

/**
 * Authorize manager and admin
 * Convenience middleware for manager+ routes
 * 
 * Usage: router.post('/api/products', protect, authorizeManager, createProduct)
 */
export const authorizeManager = authorizeRoles(VALID_ROLES.ADMIN, VALID_ROLES.MANAGER);

/**
 * Authorize all authenticated users (any role)
 * Convenience middleware to check authentication
 * 
 * Usage: router.get('/api/profile', protect, authorizeAny, getProfile)
 */
export const authorizeAny = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'NOT_AUTHENTICATED'
      });
    }
    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Authorization error'
    });
  }
};

/**
 * Get all valid roles
 */
export const getValidRoles = () => Object.values(VALID_ROLES);

/**
 * Get role hierarchy level
 */
export const getRoleLevel = (role) => ROLE_HIERARCHY[role];

/**
 * Check if a role is valid
 */
export const isValidRole = (role) => role in VALID_ROLES;

export { VALID_ROLES, ROLE_HIERARCHY };
