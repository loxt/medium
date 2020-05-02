import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import reducer from './reducer';

export const history = createBrowserHistory();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
