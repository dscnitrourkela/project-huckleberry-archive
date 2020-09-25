import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { login, setBadgesToken, logout } from '../../actions/auth.action';
import firebase from '../../firebase';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  uuid: state.auth.uuid,
});

const mapActionsToProps = {
  login,
  logout,
  setBadgesToken,
};

function LoginButton({ login, logout, setBadgesToken, user, uuid }) {
  const classes = useStyles();
  let provider;

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

  console.log(user, uuid);

  const onLoginClick = () => {
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const onLogoutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => logout())
      .catch((error) => console.log(error));
  };

  const renderLoginButton = () => {
    switch (uuid) {
      case undefined:
        <h1>Loading...</h1>;
      case null:
        return (
          <Button className={classes.button} color='primary' onClick={onLoginClick}>
            Sign in with Google
          </Button>
        );
      default:
        return (
          <Button className={classes.button} color='primary' onClick={onLogoutClick}>
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
