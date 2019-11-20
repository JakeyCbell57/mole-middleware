const pubsub = require('pg-pubsub');
const exchange = require('./exchange');

const subscription = new pubsub(process.env.DATABASE_URL || 'postgres://localhost/mole');

subscription.addChannel('new-order-event');
subscription.on('new-order-event', exchange.buyBTC);

module.exports = subscription;
