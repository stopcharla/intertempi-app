import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import signIn from './component/signIn';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          {/* <div className="App__Aside"></div> */}
          <div className="App__Form">

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                  <signIn/>
              </div>

              <Route path="/sign-in" component={signIn}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;