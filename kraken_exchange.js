
const KrakenClient = require('kraken-api');
const key = process.env.KRAKEN_KEY;
const secret = process.env.KRAKEN_SECRET;
const kraken = new KrakenClient(key, secret);



function karkenBuyBTC({ order_total, order_id }) {

  let balance = await kraken.api('Balance')
  console.log(balance)

  let ticker = (await kraken.api('Ticker', { pair: 'XBTCAD' }));
  let volume = karkenCalculateVolume(ticker);
  let buy_order_BTC = await kraken.api('AddOrder', { pair: 'XBTCAD', type: 'buy', ordertype: 'market', volume: volume, starttm: '0' }));




}



/*Calculate possible volume*/
async function karkenCalculateVolume(ticker, balance) {

  let bid_price = ticker.a.price;
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
