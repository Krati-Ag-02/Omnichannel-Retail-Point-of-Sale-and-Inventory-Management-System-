const express = require("express");
const router = express.Router();

const {
  getSalesSummary,
  getLowStockProducts,
  getTopProducts
} = require("../controllers/analyticsController");

router.get("/sales-summary", getSalesSummary);
router.get("/low-stock", getLowStockProducts);
router.get("/top-products", getTopProducts);

module.exports = router;