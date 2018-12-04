module.exports = bidding => {
  return [
    bidding => {
      return bidding.id !== undefined;
    },
    bidding => {
      return bidding.price !== undefined && Number.isInteger(bidding.price);
    }
  ].reduce((isValid, cur) => {
    return isValid && cur(bidding);
  }, true);
};
