import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import TableContainer from './containers/TableContainer';
import HeaderSideNav from './components/HeaderSideNav/HeaderSideNav';
import Landing from './components/Landing/Landing';

const App = () => {
  return (
    <Router>
      <div>
        <div className="bx--grid bx--grid--full-width landing-page">
          <HeaderSideNav />
          <Switch>
            <Route path="/data-table">
              <TableContainer />
            </Route>
            <Route path="*">
              <Landing />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;