const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.redis_hostname,
    port: process.env.redis_port
})
async function connectRedisClient() {

    if (!(redisClient.isOpen && redisClient.isReady)) {
        await redisClient.connect();
    }
}

module.exports = { redisClient,connectRedisClient }