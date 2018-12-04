const sinon = require('sinon');
const expect = require('chai').expect;
const supertest = require('supertest');
const express = require('express');
const itemStorage = require('../../../src/store/itemStorage');
const itemsRoute = require('../../../src/routes/items.js');

const sandbox = sinon.createSandbox();

describe('items route', () => {
  let app, request, getAllStub, getStub;

  before(() => {
    getAllStub = sandbox.stub(itemStorage, 'getAll');
    getStub = sandbox.stub(itemStorage, 'get');
  });

  beforeEach(() => {
    app = express();
    itemsRoute(app);
    request = supertest(app);
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    getStub.restore();
    getAllStub.restore();
  });

  describe('/api/item/all', () => {
    it('should return all the items', done => {
      const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
      getAllStub.resolves(items);
      request
        .get('/api/item/all')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.deep.equal(items);
          done();
        });
    });

    it('should return no items', done => {
      const items = [];
      getAllStub.resolves(items);
      request
        .get('/api/item/all')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.deep.equal(items);
          done();
        });
    });

    it('should return no items when data storage throw an error', done => {
      const error = 'Database is down.';
      getAllStub.rejects(error);
      request
        .get('/api/item/all')
        .expect('Content-Type', /json/)
        .expect(500, (err, res) => {
          expect(res.error.text).to.contains(error);
          done();
        });
    });
  });

  describe('/api/item/:id', () => {
    it('should return the item with id as 1', done => {
      const item = { id: '1' };
      getStub.resolves(item);
      request
        .get('/api/item/1')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.deep.equal(item);
          done();
        });
    });

    it('should return no item when data storage throw an error', done => {
      const error = 'Database is down.';
      getStub.rejects(error);
      request
        .get('/api/item/1')
        .expect('Content-Type', /json/)
        .expect(500, (err, res) => {
          expect(res.error.text).to.contains(error);
          done();
        });
    });
  });
});
