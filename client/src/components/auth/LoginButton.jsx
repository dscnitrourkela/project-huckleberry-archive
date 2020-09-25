import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { login, setBadgesToken, logout } from '../../actions/auth.action';
import firebase from '../../firebase';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  badge_token: state.auth.badge_token,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapActionsToProps = {
  login,
  setBadgesToken,
  logout,
};

function LoginButton({ login, setBadgesToken, isLoggedIn, logout, user }) {
  const classes = useStyles();
  let provider;

  useEffect(() => {
    provider = new firebase.auth.GoogleAuthProvider();
    if (!localStorage.getItem('uuid')) {
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          console.log('Hi hi hi');
          const token = result.credential.accessToken;
          const user = result.user;
          setBadgesToken(token);
          login(user);
        });
    }
  }, []);

  console.log(user, isLoggedIn);

  const onLoginClick = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const renderLoginButton = () => {
    switch (isLoggedIn) {
      case undefined:
        <h1>Loading...</h1>;
      case false:
        return (
          <Button className={classes.button} color='primary' onClick={onLoginClick}>
            Sign in with Google
          </Button>
        );
      default:
        return (
          <Button className={classes.button} color='primary' onClick={logout}>
            Logout
          </Button>
        );
    }
  };

  return renderLoginButton();
}

export default connect(mapStateToProps, mapActionsToProps)(LoginButton);

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '0.3em',
    padding: '0.6em',
  },
}));
