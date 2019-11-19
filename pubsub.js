const pubsub = require('pg-pubsub');
const subscription = new pubsub(process.env.DATABASE_URL || 'postgres://localhost/mole');

subscription.addChannel('new-order-event');

subscription.on('new-order-event', data => {
  console.log(data);
});

module.exports = subscription;
