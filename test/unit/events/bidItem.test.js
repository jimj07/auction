const sinon = require('sinon');
const expect = require('chai').expect;
const itemStorage = require('../../../src/store/itemStorage');
const bidItem = require('../../../src/events/bidItem.js');
const bidUpdate = require('../../../src/events/bidUpdate.js');

const sandbox = sinon.createSandbox();

describe('bidItem', () => {
  let setPriceStub, getStub, client1, bidUpdateEmitStub;

  before(() => {
    setPriceStub = sandbox.stub(itemStorage, 'setPrice');
    getStub = sandbox.stub(itemStorage, 'get');
    bidUpdateEmitStub = sandbox.stub(bidUpdate, 'emit');
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    getStub.restore();
    setPriceStub.restore();
  });

  it('should set the price as 100', async () => {
    getStub.resolves({
      id: 1,
      price: 90
    });

    setPriceStub.resolves();

    await bidItem(
      {
        id: 1,
        price: 100
      },
      null,
      () => {}
    );

    expect(setPriceStub.called).to.equal(true);
    expect(setPriceStub.getCall(0).args).to.deep.equal([1, 100]);
  });

  it('should not set price lower than existing price', async () => {
    getStub.resolves({
      id: 1,
      price: 90
    });

    setPriceStub.resolves();

    await bidItem(
      {
        id: 1,
        price: 80
      },
      null,
      () => {}
    );

    expect(setPriceStub.called).to.equal(false);
  });

  it('should not set price if item is not found', async () => {
    getStub.resolves(undefined);

    setPriceStub.resolves();

    await bidItem(
      {
        id: 1,
        price: 80
      },
      null,
      () => {}
    );

    expect(setPriceStub.called).to.equal(false);
  });

  it('should not set price if event id is invalid', async () => {
    getStub.resolves(undefined);

    setPriceStub.resolves();

    await bidItem(
      {
        price: 80
      },
      null,
      () => {}
    );

    expect(setPriceStub.called).to.equal(false);
  });

  it('should not set price if event price is invalid', async () => {
    getStub.resolves(undefined);

    setPriceStub.resolves();

    await bidItem(
      {
        id: 1,
        price: 'sdsdff'
      },
      null,
      () => {}
    );

    expect(setPriceStub.called).to.equal(false);
  });
});
