import React from 'react';
import { Route, Switch } from 'react-router';
import SignInWith from './components/SignInWith';

import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Editor from './components/Editor';
import ArticleView from './components/ArticleView';
import requireAuth from './utils/requireAuth';

export default function App() {
  const pathName = window.location.pathname;
  return (
    <>
      {!pathName.includes('editor') ? <Header /> : ''}
      <SignInWith>
        <Switch>
          <Route exact path='/' component={Feed} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/articleview/:id' component={ArticleView} />
          <Route path='/editor' component={requireAuth(Editor)} />
          <Route path='**' component={Feed} />
        </Switch>
      </SignInWith>
    </>
  );
}
