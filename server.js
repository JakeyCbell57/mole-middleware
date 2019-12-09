if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

require('./pubsub');
require('./schedule');
require('./telegram');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressRateLimiter = require('express-rate-limit');
const RateLimitRedis = require('rate-limit-redis');
const redis = require('redis');
const { authorization } = require('./middleware');
const orders = require('./orders');


const server = express();
const PORT = process.env.PORT;
const minutes = (num = 1) => num * 60 * 1000;
const kraken = require('./kraken_exchange')

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  server.use(morgan('dev'));
}

//rate limit only in production
if (process.env.NODE_ENV === 'production') {
  const client = redis.createClient({ url: process.env.REDIS_URL });

  const rateLimiter = expressRateLimiter({
    store: new RateLimitRedis({ client }),
    windowMS: minutes(1),
    max: 600
  });

  server.set('trust proxy', '127.0.0.1');
  server.use(rateLimiter);
}

server.use(cors());
server.use(bodyParser.json());
server.use(authorization);

server.post('/report', async (req, res, next) => {
  try {
    const data = req.body;

    await orders.storeIfNotExist(data);
    res.end();

  } catch (error) {
    next(error);
  }
});

server.listen(PORT, () => console.log(`server listening on ${PORT}`));
