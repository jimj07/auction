import React, { Component } from 'react';
import ItemList from '../components/ItemList';
import AuctionItemApi from '../api/AuctionItemApi';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const items = await AuctionItemApi.all();
    this.setState({
      items
    });
  }

  render() {
    return (
      <div className="Home">
        {this.state.items && <ItemList items={this.state.items} />}
      </div>
    );
  }
}

export default Home;
