const AuctionItemApi = {
  items: [
    { id: '1', name: '111', endTime: '2019-01-01T19:20+11:00' },
    { id: '2', name: '222', endTime: '2019-01-01T19:20+11:00' },
    { id: '3', name: '333', endTime: '2019-01-01T19:20+11:00' },
    { id: '4', name: '444', endTime: '2019-01-01T19:20+11:00' },
    { id: '5', name: '555', endTime: '2019-01-01T19:20+11:00' },
    { id: '6', name: '666', endTime: '2019-01-01T19:20+11:00' }
  ],
  all: function() {
    return this.items;
  },
  get: function(id) {
    return this.items.find(item => item.id === id);
  }
};

export default AuctionItemApi;
