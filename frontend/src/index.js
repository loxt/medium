import React from 'react';
import ReactDOM from 'react-dom';
import './assets/medium.css';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';

import { history, store } from './redux/store';
import { getUser } from './redux/actions/actions';

require('dotenv').config();

if (localStorage.Auth) {
  // update localStorage
  store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) });
  const { id } = JSON.parse(localStorage.Auth);
  getUser(id).then((res) => {
    store.dispatch({ type: 'SET_USER', user: res });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
