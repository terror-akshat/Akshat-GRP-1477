const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  url:  process.env.REDIS_URI ||  "redis://127.0.0.1:6379" 
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready to use.");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

redisClient.on("end", () => {
  console.log("Redis connection closed.");
});

(async () => {
  await redisClient.connect();
  console.log("Redis client connection established.");
})();

module.exports = redisClient;