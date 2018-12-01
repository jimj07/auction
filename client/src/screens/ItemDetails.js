import React from 'react';
import PropTypes from 'prop-types';

const ItemDetails = ({ id, name }) => {
  return (
    <div className="auction-item-details">
      <h2>
        Item: {id} - {name}
      </h2>
    </div>
  );
};

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ItemDetails;
