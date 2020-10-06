import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

// Helpers
import firebase from '../helpers/firebase';
import createBrowserHistory from '../helpers/history';
import { saveImage } from '../helpers/uploadImage';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Sidebar from '../components/marginals/Sidebar';

// Redux
import { connect } from 'react-redux';
import { fetchUser, logout } from '../actions/auth.action';

const mapActionsToProps = {
  fetchUser,
  logout,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

// Main component
function App({ fetchUser, logout, user }) {
  useEffect(() => {
    // Add listener as soon as the app is loaded.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchUser(user.uid);
      } else {
        logout();
      }
    });
  }, []);

  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      {user && (
        <Route path={`/profile`}>
          <Profile />
        </Route>
      )}
      <Route path={`/profile/share/:id`}>
        <Profile />
      </Route>
      <Redirect to={`/livestream`} />
    </Switch>
  );

  return (
    <Router history={createBrowserHistory}>
      <Sidebar>{renderRoutes()}</Sidebar>
    </Router>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(App);
