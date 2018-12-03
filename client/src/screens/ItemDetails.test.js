import React from 'react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';

import sinon from 'sinon';
import ItemDetails from './ItemDetails';
import AuctionItemApi from '../api/AuctionItemApi';

const sandbox = sinon.createSandbox();
const auctionItemApiGetStub = sandbox.stub(AuctionItemApi, 'get');
const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('ItemDetails', () => {
  afterEach(() => {
    sandbox.reset();
  });

  it('should render nothing when item is undefined', async () => {
    auctionItemApiGetStub.resolves(undefined);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/123']}>
        <Route path="/:id" component={ItemDetails} />
      </MemoryRouter>
    );

    await waitForAsync();
    wrapper.update();
    expect(wrapper.exists('.auction-item-details-container')).toBeFalsy();
  });

  it('show show auction item with finished countdown', async () => {
    const item = {
      id: 123,
      name: 'test item',
      price: 100,
      endTime: '2018-12-02T20:45:00+11:00',
      imageSrc:
        'http://livedemo00.template-help.com/wt_53883/img/page1_pic6.jpg'
    };

    auctionItemApiGetStub.resolves(item);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/123']}>
        <Route path="/:id" component={ItemDetails} />
      </MemoryRouter>
    );

    await waitForAsync();
    wrapper.update();
    expect(wrapper.exists('.auction-item-details-container')).toBeTruthy();
    expect(wrapper.exists('.autction-count-down-finished')).toBeTruthy();
    expect(wrapper.contains('(Final Price)'));
    expect(wrapper.exists('.auction-item-bidding-action')).toBeFalsy();
  });

  it('show show auction item', async () => {
    const item = {
      id: 123,
      name: 'test item',
      price: 100,
      endTime: '2018-12-02T20:45:00+11:00',
      imageSrc:
        'http://livedemo00.template-help.com/wt_53883/img/page1_pic6.jpg'
    };

    auctionItemApiGetStub.resolves(item);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/123']}>
        <Route path="/:id" component={ItemDetails} />
      </MemoryRouter>
    );

    await waitForAsync();
    wrapper.update();
    expect(wrapper.exists('.auction-item-details-container')).toBeTruthy();
    expect(wrapper.exists('.autction-count-down-finished')).toBeTruthy();
    expect(wrapper.contains('(Final Price)'));
    expect(wrapper.exists('.auction-item-bidding-action')).toBeFalsy();
  });

  it('should bid up price by $10', async () => {
    const item = {
      id: 123,
      name: 'test item',
      price: 100,
      endTime: '2222-12-02T20:45:00+11:00',
      imageSrc:
        'http://livedemo00.template-help.com/wt_53883/img/page1_pic6.jpg'
    };

    auctionItemApiGetStub.resolves(item);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/123']}>
        <Route path="/:id" component={ItemDetails} />
      </MemoryRouter>
    );

    await waitForAsync();
    wrapper.update();
    expect(wrapper.exists('.auction-item-details-container')).toBeTruthy();
    expect(wrapper.exists('.autction-count-down-finished')).toBeFalsy();
    expect(wrapper.contains('(Final Price)')).toBeFalsy();
    expect(wrapper.exists('.auction-item-bidding-action')).toBeTruthy();

    const bid10 = wrapper
      .find('.auction-item-bidding-button')
      .filterWhere(n => n.text() === '+$10');

    const itemDetailsInstance = wrapper.find('ItemDetails').instance();
    const socketEmitSpy = sandbox.spy(itemDetailsInstance.socket, 'emit');

    bid10.simulate('click');
    expect(
      socketEmitSpy.calledWith('biditem', {
        id: 123,
        price: 110
      })
    ).toBeTruthy();
  });

  it('should show finished when countdown is finished', async () => {
    const item = {
      id: 123,
      name: 'test item',
      price: 100,
      endTime: '2222-12-02T20:45:00+11:00',
      imageSrc:
        'http://livedemo00.template-help.com/wt_53883/img/page1_pic6.jpg'
    };

    auctionItemApiGetStub.resolves(item);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/123']}>
        <Route path="/:id" component={ItemDetails} />
      </MemoryRouter>
    );

    await waitForAsync();
    wrapper.update();
    expect(wrapper.exists('.auction-item-details-container')).toBeTruthy();
    expect(wrapper.exists('.autction-count-down-finished')).toBeFalsy();
    expect(wrapper.contains('(Final Price)')).toBeFalsy();
    expect(wrapper.exists('.auction-item-bidding-action')).toBeTruthy();

    const itemDetailsInstance = wrapper.find('ItemDetails').instance();

    expect(itemDetailsInstance.state.isFinished).toBeFalsy();

    itemDetailsInstance.handleCountDownComplete();

    expect(itemDetailsInstance.state.isFinished).toBeTruthy();
  });
});
