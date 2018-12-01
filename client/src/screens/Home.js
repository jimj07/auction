import React, { Component } from 'react';
import Header from '../components/Header';
import ItemList from '../components/ItemList';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      items: [
        { id: 1, name: '111', endTime: '2019-01-01T19:20+11:00' },
        { id: 2, name: '222', endTime: '2019-01-01T19:20+11:00' },
        { id: 3, name: '333', endTime: '2019-01-01T19:20+11:00' },
        { id: 4, name: '444', endTime: '2019-01-01T19:20+11:00' },
        { id: 5, name: '555', endTime: '2019-01-01T19:20+11:00' },
        { id: 6, name: '666', endTime: '2019-01-01T19:20+11:00' }
      ]
    });
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

export default Home;
