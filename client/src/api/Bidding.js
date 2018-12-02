import openSocket from 'socket.io-client';

const serverUrl = 'http://localhost:3000';
const socket = openSocket(serverUrl);

function subscribeToBidUpdate(id, cb) {
  socket.on(`bidupdate-${id}`, bidUpdate => cb(bidUpdate));
}

function bidItem(id, price) {
  socket.emit(`biditem`, { id, price });
}
export { subscribeToBidUpdate, bidItem };
