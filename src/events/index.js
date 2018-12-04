const bidItem = require('./bidItem');

module.exports = socket => {
  console.log('a user is connected');
  socket.on('biditem', (bidding, ack) => {
    bidItem(bidding, socket, ack);
  });
};
