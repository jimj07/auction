import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import './Item.css';

const Item = ({ id, name, currentPrice, imageSrc, endTime }) => {
  return (
    <Link className="auction-item-card" to={`/item/${id}`}>
      <div className="autction-time-left">
        <Countdown date={endTime}>
          <h2>Finished</h2>
        </Countdown>
      </div>
      <img className="auction-item-img" src={imageSrc} alt={`item ${name}`} />
      <p className="auction-item-price">${currentPrice}</p>
      <h3 className="auction-item-name">{name}</h3>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Item;
