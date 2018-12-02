module.exports = (bidUpdate, socket) => {
  socket.broadcast.emit(`bidupdate-${bidUpdate.id}`, {
    price: bidUpdate.price
  });
};
