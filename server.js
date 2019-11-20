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
const { authorization } = require('./middleware');
const woocommerce = require('./woocommerce');

const server = express();
const PORT = process.env.PORT;


if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  server.use(morgan('dev'));
}

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

server.use(cors());
server.use(bodyParser.json());
server.use(authorization);

server.post('/report', (req, res, next) => {
  try {
    console.log(req.body)
    const { apikey } = req.query;

    if (apikey === process.env.API_KEY) {
      // woocommerce.queryOrders();
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
