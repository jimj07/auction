import React from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';

const ItemList = ({ items }) => {
  return (
    <div className="auction-item-list">
      {items.map(item => (
        <Item key={`item-${item.id}`} name={item.name} id={item.id} />
      ))}
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
