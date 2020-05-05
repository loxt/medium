import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { store } from '../redux/store';

const history = createBrowserHistory();

export default function (Component) {
  const { thisAuth } = store.getState();

  useEffect(() => {
    if (!thisAuth) {
      history.push('/');
    }
  });

  function Authenticate() {
    return <Component />;
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.authUser.isAuth,
    };
  };
  return connect(mapStateToProps)(Authenticate);
}
