const bidUpdate = require('./bidUpdate');
const itemStorage = require('../store/itemStorage');

module.exports = async (bidding, socket) => {
  const item = await itemStorage.get(bidding.id);

  if (bidding.price > item.price) {
    await itemStorage.setPrice(bidding.id, bidding.price);

    console.log(bidding);
    bidUpdate(bidding, socket);
  }
};
