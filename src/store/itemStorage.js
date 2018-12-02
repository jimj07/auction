const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('items.json');
const db = low(adapter);

db.defaults({ items: [] }).write();

const getAll = async () => {
  return await db.get('items').value();
};

const get = async id => {
  return await db
    .get('items')
    .find({ id })
    .value();
};

const setPrice = async (id, price) => {
  return await db
    .get('items')
    .find({ id })
    .assign({ price })
    .write();
};

module.exports = {
  get,
  getAll,
  setPrice
};
