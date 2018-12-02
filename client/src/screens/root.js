import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import ItemDetails from './ItemDetails';

const ScreensRoot = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={'/item/:id'} component={ItemDetails} />
      </Switch>
    </div>
  </Router>
);

export default ScreensRoot;
