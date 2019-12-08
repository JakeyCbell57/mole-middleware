const scheduler = require('node-schedule');

const INTERVAL = 1;
const EVERY_N_MINUTES = `*/${INTERVAL} * * * *`;

scheduler.scheduleJob(EVERY_N_MINUTES, () => {
  try {
    //check balances
    //buy btc
    //transfer btc
    console.log('testing', new Date().toISOString());

  } catch (error) {
    console.log(error)
  }
});
