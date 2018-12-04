import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from './CountDown';
import './Item.css';

const Item = ({ id, name, price, imageSrc, endTime }) => {
  return (
    <Link className="auction-item-card" to={`/item/${id}`}>
      <Countdown endTime={endTime} />
      <img className="auction-item-img" src={imageSrc} alt={`item ${name}`} />
      <p className="auction-item-price">${price}</p>
      <h3 className="auction-item-name">{name}</h3>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};

export default Item;
