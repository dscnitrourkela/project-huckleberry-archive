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

const mapStateToProps = (state) => ({
  uuid: state.auth.uuid,
});

const mapActionsToProps = {
  login,
  setBadgesToken,
  onSignInBadge,
};

function App({ uuid }) {
  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      {(
        <Route path={`/profile`}>
          <Profile />
        </Route>
      )}
      <Redirect to={`/livestream`} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Sidebar>{renderRoutes()}</Sidebar>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(App);
