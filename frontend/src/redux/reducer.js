import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import common from './reducers/common';
import articles from './reducers/articles';
import authUser from './reducers/authUser';

const history = createBrowserHistory();

export default combineReducers({
  articles,
  authUser,
  common,
  router: connectRouter(history),
});
