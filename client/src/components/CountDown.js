import React from 'react';
import PropTypes from 'prop-types';
import CountDownNow from 'react-countdown-now';
import './CountDown.css';

const CountDown = ({ endTime, onComplete }) => (
  <div className="autction-count-down">
    <CountDownNow date={endTime} onComplete={onComplete}>
      <span className="autction-count-down-finished">Finished</span>
    </CountDownNow>
  </div>
);

CountDown.propTypes = {
  endTime: PropTypes.string.isRequired
};

export default CountDown;
