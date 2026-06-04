import Product from '../models/Product.js';
import redisClient from '../utils/redisClient.js';

const buildCacheKey = ({ search, cursor, limit }) => {
  const content = `search=${search || 'all'}|cursor=${cursor || 'none'}|limit=${limit || 20}`;
  return `products:${Buffer.from(content).toString('base64')}`;
};

const clearProductCache = async () => {
  // Cache operations ko Redis down ho to bhi fail-safe rakho.
  try {
    if (!redisClient.isOpen) return;
    for await (const key of redisClient.scanIterator({ MATCH: 'products:*' })) {
      await redisClient.del(key);
    }
  } catch (_) {
    // ignore cache errors
  }
};


export const getProducts = async (req, res) => {
  try {
    const search = req.query.search?.trim();
    const cursor = req.query.cursor;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
    const cacheKey = buildCacheKey({ search, cursor, limit });

    // Cache read (Redis down ho to bhi fail nahi hona chahiye)
    try {
      if (redisClient.isOpen) {
        const cached = await redisClient.get(cacheKey);
        if (cached) return res.json(JSON.parse(cached));
      }
    } catch (_) {
      // ignore cache errors
    }



    const query = {};
    let sort = { _id: 1 };
    let projection = null;

    if (search) {
      query.$text = { $search: search };
      projection = { score: { $meta: 'textScore' } };
      sort = { score: { $meta: 'textScore' } };
    }

    if (cursor) {
      query._id = { ...query._id, $gt: cursor };
    }

    const products = await Product.find(query, projection)
      .sort(sort)
      .limit(limit + 1);

    const hasNext = products.length > limit;
    const pageItems = hasNext ? products.slice(0, limit) : products;
    const nextCursor = hasNext ? pageItems[pageItems.length - 1]._id : null;

    const response = { data: pageItems, nextCursor };

    if (redisClient.isOpen) {
      try {
        await redisClient.setEx(cacheKey, 60, JSON.stringify(response));
      } catch (_) {
        // ignore cache errors
      }
    }


    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    await clearProductCache();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await clearProductCache();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    await clearProductCache();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
