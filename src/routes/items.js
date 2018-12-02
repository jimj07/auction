const express = require('express');
const itemStorage = require('../store/itemStorage');
const router = express.Router();

router.get('/all', async (req, res) => {
  const items = await itemStorage.getAll();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await itemStorage.get(req.params.id);
  res.json(item);
});

module.exports = router;
