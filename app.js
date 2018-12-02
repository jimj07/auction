const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./src/routes/items');
const socketEventHandler = require('./src/events');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
io.on('connection', socketEventHandler);

app.use('/api/item', items);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
