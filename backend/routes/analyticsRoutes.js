import express from "express";

const router = express.Router();

import {
  getSalesSummary,
  getLowStockProducts,
  getTopProducts,
  getInventoryForecast
} from "../controllers/analyticsController.js";

router.get("/sales-summary", getSalesSummary);
router.get("/low-stock", getLowStockProducts);
router.get("/top-products", getTopProducts);
router.get("/inventory-forecast", getInventoryForecast);

export default router;