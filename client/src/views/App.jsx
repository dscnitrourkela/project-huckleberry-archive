import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Firebase
import firebase from '../firebase';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Sidebar from '../components/marginals/Sidebar';

// Redux
import { connect } from 'react-redux';
import { login, logout } from '../actions/auth.action';

const mapActionsToProps = {
  login,
  logout,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

function App({ login, logout, user }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        login(user);
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

      <Route path={`/profile`}>
        <Profile />
      </Route>

      <Route path={`/profile/share/:id`}>
        <Profile />
      </Route>
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
