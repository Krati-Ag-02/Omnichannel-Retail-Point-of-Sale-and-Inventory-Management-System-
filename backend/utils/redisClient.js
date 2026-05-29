import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create client but do NOT crash app if Redis is down.
const client = redis.createClient({ url: REDIS_URL });

let isRedisAvailable = false;
let hasLoggedError = false;

// Avoid log spam.
client.on('error', (err) => {
  if (!hasLoggedError) {
    hasLoggedError = true;
    // console.error('Redis unavailable:', err?.message || err);
  }
});


// Avoid tight retry loops when Redis is down.
// (Callers will check `isRedisAvailable`.)
let connectPromise = null;

// Lazy-connect: cache operations se pehle connect attempt karega.
const connectRedis = async () => {
  if (isRedisAvailable) return true;
  if (client.isOpen) {
    isRedisAvailable = true;
    return true;
  }

  // Prevent multiple parallel connect attempts.
  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    try {
      if (!client.isOpen) {
        await client.connect();
      }
      isRedisAvailable = true;
      return true;
    } catch (error) {
      isRedisAvailable = false;
      // Avoid noisy logs.
      console.error('Redis connection failed:', error?.message || error);
      return false;
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
};


// Do not auto-connect at startup; Redis might not be installed/running.
// Controllers already check `isOpen`/`isRedisAvailable` before cache operations.
// connectRedis();



// Expose both client and availability so callers can skip Redis operations.
export { isRedisAvailable };
export { connectRedis };
export default client;


