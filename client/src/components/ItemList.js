import React from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';

const ItemList = ({ items }) => {
  return (
    <div className="auction-item-list">
      {items.map(item => (
        <Item key={`item-${item.id}`} name={item.name} />
      ))}
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(Item.propTypes)
};

ItemList.defaultProps = {
  items: []
};

export default ItemList;
