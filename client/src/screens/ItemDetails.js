import React from 'react';
import { Link } from 'react-router-dom';
import AuctionItemApi from '../api/AuctionItemApi';

const ItemDetails = props => {
  console.log(props);
  const item = AuctionItemApi.get(props.match.params.id);

  return (
    <div className="auction-item-details">
      <h2>
        Item: {item.id} - {item.name}
      </h2>
      <Link to="/">Back</Link>
    </div>
  );
};

export default ItemDetails;
