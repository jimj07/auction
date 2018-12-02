import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuctionItemApi from '../api/AuctionItemApi';

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
      <div className="auction-item-details">
        <Link to="/">Back</Link>
        <div className="auction-item-gallery" />
        <div classNem="auction-item-right">
          <h2>{item.name}</h2>

          <div className="auction-item-bidding">
            <div className="auction-item-current-price" />
            <form className="auction-item-bidding-action">
              <div className="auction-item-bidding-input" />
              <button className="auction-item-bidding-button" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
