import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignIn from './component/signIn';
import Home from './component/home';
import './App.css';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' name='Login Page' component={SignIn} />
            <Route path='/home' name='Home' component={Home} />
        </Switch>
    </Router>
), document.getElementById('root'));

serviceWorker.unregister();