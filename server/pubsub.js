const pubsub = require('pg-pubsub');
const orders = require('./server/orders');

const subscription = new pubsub(process.env.DATABASE_URL || 'postgres://localhost/mole');

subscription.addChannel('new-order-event');
subscription.on('new-order-event', orders.storeIfNotExist);

module.exports = subscription;
