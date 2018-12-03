import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Link } from 'react-router-dom';
import AuctionItemApi from '../api/AuctionItemApi';
import './ItemDetails.css';
import CountDown from '../components/CountDown';

const serverUrl = 'http://localhost:3000';

class ItemDetails extends Component {
  socket = null;
  state = {
    isFinished: false
  };

  async componentDidMount() {
    const item = await AuctionItemApi.get(this.props.match.params.id);

    if (!item) {
      return;
    }

    this.setState({
      item,
      price: item.price
    });

    const endTime = new Date(item.endTime);
    if (endTime.getTime() > Date.now()) {
      //subscribe to bid update
      this.socket = openSocket(serverUrl);
      this.socket.on(`bidupdate-${item.id}`, bidUpdate => {
        this.setState({
          price: bidUpdate.price
        });
      });
    } else {
      this.setState({
        isFinished: true
      });
    }
  }

  handleCountDownComplete = () => {
    this.setState({
      isFinished: true
    });

    if (this.socket) {
      this.socket.close();
    }
  };

  handleBidClick = increment => {
    return () => {
      const { item } = this.state;
      if (item && this.socket) {
        this.socket.emit('biditem', {
          id: item.id,
          price: item.price + increment
        });
      }
    };
  };

  render() {
    const { item } = this.state;
    if (!item) {
      return null;
    }

    return (
      <div className="auction-item-details-container">
        <Link to="/" className="btn">
          Back
        </Link>
        <div className="auction-item-details">
          <div className="auction-item-gallery">
            <CountDown
              endTime={item.endTime}
              onComplete={this.handleCountDownComplete}
            />
            <img
              className="auction-item-img"
              src={item.imageSrc}
              alt={`item ${item.name}`}
            />
          </div>
          <div className="auction-item-right">
            <h2>{item.name}</h2>
            <div className="auction-item-bidding">
              <div
                className="auction-item-current-price"
                key={this.state.price}
              >
                ${this.state.price}
                {this.state.isFinished ? ' (Final Price)' : ''}
              </div>
              {!this.state.isFinished && (
                <form className="auction-item-bidding-action">
                  {[10, 50, 100].map(increment => (
                    <button
                      key={`bidding-button-${increment}`}
                      className="auction-item-bidding-button btn"
                      onClick={this.handleBidClick(increment)}
                    >
                      +${increment}
                    </button>
                  ))}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
