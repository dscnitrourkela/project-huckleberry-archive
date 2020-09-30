import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import firebase from '../firebase';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Sidebar from '../components/marginals/Sidebar';

// Redux
import { connect } from 'react-redux';
import { login, setBadgesToken } from '../actions/auth.action';
import { onSignInBadge } from '../actions/badges.action';

const mapActionsToProps = {
  login,
  setBadgesToken,
  onSignInBadge,
};

function App({ login }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        login(user);
        setBadgesToken(localStorage.getItem('access_token'));
      } else {
        console.log('no user');
      }
    });
  }, []);

  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      {
        <Route path={`/profile`}>
          <Profile />
        </Route>
      }
      <Redirect to={`/livestream`} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Sidebar>{renderRoutes()}</Sidebar>
    </BrowserRouter>
  );
}

export default connect(null, mapActionsToProps)(App);
