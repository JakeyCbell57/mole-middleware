
const KrakenClient = require('kraken-api');
const key = process.env.KRAKEN_KEY;
const secret = process.env.KRAKEN_SECRET;
const kraken = new KrakenClient(key, secret);


async function karkenBuyBTC({ order_total, order_id }) {

  //let balance = await kraken.api('Time')
  //console.log(balance)
  let balance = 10000

<<<<<<< HEAD
  let ticker = (await kraken.api('Ticker', { pair: 'XBTCAD' }));
  let volume = karkenCalculateVolume(ticker, balance);
  let buy_order_BTC = await kraken.api('AddOrder', { validate: true, pair: 'XBTCAD', type: 'buy', ordertype: 'market', volume: volume, starttm: '0' });
=======
>>>>>>> c235b4c390869f9dd9bb21ce327c076eb6f1a3a5

  let ticker = (await kraken.api('Ticker', { pair: 'XBTCAD' }));
  //console.log(ticker.result.XXBTZCAD.a[0])
  let volume = karkenCalculateVolume(ticker, balance);
  //let buy_order_BTC = await kraken.api('AddOrder', { validate: true, pair: 'XBTCAD', type: 'buy', ordertype: 'market', volume: volume, starttm: '0' });



}

karkenBuyBTC({ order_total: 1, order_id: '12312' });



/*Calculate possible volume*/
async function karkenCalculateVolume(ticker, balance) {

  let bid_price = ticker.result.XXBTZCAD.a[0];
  let volume = bid_price / balance;
  return volume

}

/*Transfer BTC*/
async function karkenTranser(ticker, balance) {



}



module.exports = {
  karkenBuyBTC,
  karkenTranser
};
