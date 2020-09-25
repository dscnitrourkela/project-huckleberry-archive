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

const mapStateToProps = (state) => ({
  uuid: state.auth.uuid,
});

const mapActionsToProps = {
  login,
  setBadgesToken,
};

function App({ uuid, login, setBadgesToken }) {
  useEffect(() => {
    if (uuid) {
      console.log('isLoggedIn: true');
    } else {
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            const token = result.credential.accessToken;
            const { displayName, photoURL, email } = result.user;
            setBadgesToken(token);
            login({ displayName, photoURL, email });
          }
        });
    }
  }, []);

  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      {uuid && (
        <Route path={`/profile`} exact>
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
