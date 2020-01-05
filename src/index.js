import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import List from './components/lists/List';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/list/:id" component={List} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
