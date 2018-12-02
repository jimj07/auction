const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./src/routes/items');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app

app.use('/api/item', items);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
