import React from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';
import './ItemList.css';

const ItemList = ({ items }) => {
  return (
    <div className="auction-item-list">
      <h2 className="auction-item-list-title">
        <span>Current</span>
        <span>Auctions</span>
      </h2>
      <div className="auction-item-list">
        {items.map(item => (
          <Item key={`item-${item.id}`} {...item} />
        ))}
      </div>
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes))
};

ItemList.defaultProps = {
  items: []
};

export default ItemList;
