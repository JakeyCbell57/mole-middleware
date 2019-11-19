if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressRateLimiter = require('express-rate-limit');

const server = express();
const PORT = process.env.PORT;

const rateLimiter = expressRateLimiter({
    windowMS: 5 * 60 * 1000,
    max: 500
});

server.use(cors);
server.use(bodyParser.json());

if(process.env.NODE_ENV === 'production') {
    server.set('trust proxy', '127.0.0.1');
    server.use(rateLimiter);
}

server.listen(PORT, () => console.log(`server listening on ${PORT}`));
