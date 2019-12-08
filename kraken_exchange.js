
const KrakenClient = require('./kraken');
const key = process.env.KRAKEN_KEY;
const secret = process.env.KRAKEN_SECRET;
const kraken = new KrakenClient(key, secret);


async function karkenBuyBTC({ order_total, order_id }) {

  //Get current Balance of CAD in Kraken Wallet
  let balance = await kraken.api('Balance')

  //Get current Market value of BTC
  let ticker = (await kraken.api('Ticker', { pair: 'XBTCAD' }));

  //Calculate Amount of BTC to purchase with funding
  let volume = karkenCalculateVolume(ticker, balance);

  //let buy_order_BTC = await kraken.api('AddOrder', { validate: true, pair: 'XBTCAD', type: 'buy', ordertype: 'market', volume: volume, starttm: '0', validate: true });



}

karkenBuyBTC({ order_total: 1, order_id: '12312' });


/*Calculate possible volume*/
async function karkenCalculateVolume(ticker, balance) {

  let bid_price = ticker.result.XXBTZCAD.a[0];
  let volume = balance.result.ZCAD / bid_price;
  return volume

}

/*Transfer BTC*/
async function karkenTranser(balance) {

  let btcBalance = balance.result.XBT;
  let walletTransfer = await kraken.api('WalletTransfer', { asset: XBT, to: process.env.KRAKEN_TO_WALLET, from: process.env.KRAKEN_TO_WALLET, amount: btcBalance });


}



module.exports = {
  karkenBuyBTC,
  karkenTranser
};
