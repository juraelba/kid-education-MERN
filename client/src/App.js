import React from 'react';
import './App.css';
import {PrivateRoute} from './components/PrivateRoute.js';
import Home from './views/Home';
import Login from './views/Login';
import Matching from './views/Matching';
import Header from './components/header';
import Footer from './components/footer';
import Page2 from './views/Page2';

import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import {store} from './store';
export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header/>
        <Router history={history}>
          <PrivateRoute exact path = "/" component={Home} />
          <Route path = "/home" component = {Home} />
          <Route path = "/matching" component = {Matching} />
          <Route path = "/oldmatching" component = {Page2} />
          <Route path = "/login" component = {Login} />
        </Router>
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
