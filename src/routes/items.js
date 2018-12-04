const express = require('express');
const itemStorage = require('../store/itemStorage');

module.exports = app => {
  const router = express.Router();
  app.use('/api/item', router);

  router.get('/all', async (req, res, next) => {
    let items = [];
    try {
      items = await itemStorage.getAll();
      res.json(items);
    } catch (error) {
      const msg = `Failed to get all the items from data storage. ${error}`;
      next(`Error: ${msg} - ${error}`);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const item = await itemStorage.get(req.params.id);
      res.json(item);
    } catch (error) {
      const msg = `Failed to get item ${
        req.params.id
      } from data storage. ${error}`;
      next(`Error: ${msg} - ${error}`);
    }
  });
};
