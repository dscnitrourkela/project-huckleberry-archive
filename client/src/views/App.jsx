import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

// Helpers
import firebase from '../helpers/firebase';
import createBrowserHistory from '../helpers/history';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Sidebar from '../components/marginals/Sidebar';

// Redux
import { connect } from 'react-redux';
import { fetchUser, logout, setProfileStatus } from '../actions/auth.action';

const mapActionsToProps = {
  fetchUser,
  logout,
  setProfileStatus,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile_status: state.auth.profile_status,
});

// Main component
function App({ fetchUser, logout, user, setProfileStatus, profile_status }) {
  useEffect(() => {
    // Add listener as soon as the app is loaded.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchUser(user.uid);
        setProfileStatus('own');
      } else {
        logout();
      }
    });
  }, []);

  const renderRoutes = () => (
    <Switch>
      <Route path={`/`} exact>
        <LiveStream />
      </Route>

      {localStorage.getItem('uuid') && (
        <Route path={`/profile/:id/:id/own`} exact>
          <Profile profileStatus='own' />
        </Route>
      )}

      <Route path={`/profile/:id/:id/shared`} exact>
        <Profile profileStatus='shared' />
      </Route>

      <Redirect to={`/`} />
    </Switch>
  );

  return (
    <BrowserRouter history={createBrowserHistory}>
      <Sidebar>{renderRoutes()}</Sidebar>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(App);
