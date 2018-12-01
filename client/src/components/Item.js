import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ id, name }) => {
  return (
    <div className="auction-item-card">
      <h3>
        Item: {id} - {name}
      </h3>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Item;
