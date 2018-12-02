import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuctionItemApi from '../api/AuctionItemApi';
import './ItemDetails.css';

class ItemDetails extends Component {
  state = {};

  async componentDidMount() {
    const item = await AuctionItemApi.get(this.props.match.params.id);
    this.setState({
      item
    });
  }

  render() {
    const { item } = this.state;
    if (!item) {
      return null;
    }

    return (
      <div className="detail-wrapper">
        <Link to="/" className="btn--back">
          Back
        </Link>
        <div className="auction-item-details">
          <div className="auction-item-gallery">
            <img
              className="auction-item-img"
              src={item.imageSrc}
              alt={`item ${item.name}`}
            />
          </div>
          <div className="auction-item-right">
            <h2>{item.name}</h2>

            <div className="auction-item-bidding">
              <div className="auction-item-current-price">$299.9</div>
              <form className="auction-item-bidding-action">
                <div className="auction-item-bidding-input" />
                <button className="auction-item-bidding-button btn--back">
                  Bid
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
