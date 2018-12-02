import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Item = ({ id, name }) => {
  return (
    <Link className="auction-item-card" to={`/item/${id}`}>
      <h3>{name}</h3>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Item;
