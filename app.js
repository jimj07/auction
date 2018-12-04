const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const itemsRouter = require('./src/routes/items');
const socketEventHandler = require('./src/events');
const notFound = require('./src/middlewares/notFound');
const errorHandler = require('./src/middlewares/errorHandler');

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

itemsRouter(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

server.listen(port, () => console.log(`Listening on port ${port}`));
