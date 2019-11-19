if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

require('./pubsub');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressRateLimiter = require('express-rate-limit');
const RateLimitRedis = require('rate-limit-redis');
const redis = require('redis');
const woocommerce = require('./woocommerce');

const server = express();
const PORT = process.env.PORT;

server.use(cors);
server.use(bodyParser.json());

//rate limit onlt in production
if (process.env.NODE_ENV === 'production') {
  const client = redis.createClient({ url: process.env.REDIS_URL });

  const rateLimiter = expressRateLimiter({
    store: new RateLimitRedis({ client }),
    windowMS: 60 * 1000,
    max: 500
  });

  server.set('trust proxy', '127.0.0.1');
  server.use(rateLimiter);
}

server.get('/report', (req, res, next) => {
  try {
    const { apikey } = req.query;

    if (apikey === process.env.API_KEY) {
      woocommerce.queryOrders();
      res.end();

    } else {
      res.status(401);
      res.end();
    }

  } catch (error) {
    next(error);
  }
});

server.listen(PORT, () => console.log(`server listening on ${PORT}`));
