const bidUpdate = require('./bidUpdate');
const itemStorage = require('../store/itemStorage');
const bidItemEventValidator = require('../validators/bidItemEventValidator');

module.exports = async (bidding, socket, ack) => {
  if (!bidItemEventValidator(bidding)) {
    console.error('Error: Invalid bidItem event data.');
    return;
  }

  const item = await itemStorage.get(bidding.id);

  if (item && bidding.price > item.price) {
    await itemStorage.setPrice(bidding.id, bidding.price);

    ack && ack('Bid item successfully');
    console.log(bidding);

    bidUpdate.emit(bidding, socket);
  }
};
