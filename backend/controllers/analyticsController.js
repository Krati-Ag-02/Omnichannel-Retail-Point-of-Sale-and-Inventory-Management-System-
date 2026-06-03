import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getSalesSummary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      stock: { $lte: 5 }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: "$products.product",
          totalSold: {
            $sum: "$products.quantity"
          }
        }
      },
      {
        $sort: {
          totalSold: -1
        }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo"
        }
      }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getInventoryForecast = async (req, res) => {
  try {
    const products = await Product.find();

    const forecast = products.map((product) => ({
      productName: product.name,
      currentStock: product.stock,
      reorderLevel: product.reorderLevel,
      reorderQuantity: product.reorderQuantity,
      stockStatus:
        product.stock <= product.reorderLevel
          ? "Reorder Now"
          : "Stock Healthy"
    }));

    res.json(forecast);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};