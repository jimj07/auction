const AuctionItemApi = {
  all: async () => {
    const response = await fetch('/api/item/all');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },
  get: async id => {
    const response = await fetch(`/api/item/${id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
};

export default AuctionItemApi;
