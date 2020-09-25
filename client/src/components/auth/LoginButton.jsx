import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { logout, setBadgesToken, login } from '../../actions/auth.action';
import firebase from '../../firebase';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  uuid: state.auth.uuid,
});

const mapActionsToProps = {
  logout,
  setBadgesToken,
  login,
};

function LoginButton({ logout, uuid, login, setBadgesToken, user }) {
  const classes = useStyles();
  let provider;

  const onLoginClick = async () => {
    try {
      provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      if (result.credential) {
        const {
          user: { displayName, photoURL, email },
          credential: { accessToken },
        } = result;
        await login({ displayName, photoURL, email });
        await setBadgesToken(accessToken);
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const onLogoutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => logout())
      .catch((error) => console.log(error));
  };

  const renderLoginButton = () => {
    switch (localStorage.getItem('uuid')) {
      case undefined:
        return <h1>Loading...</h1>;
      case null:
        return (
          <Button className={classes.button} color='primary' onClick={onLoginClick}>
            Sign in
          </Button>
        );
      default:
        return (
          <Button className={classes.button} color='primary' onClick={onLogoutClick}>
            Sign out
          </Button>
        );
    }
  };

  return renderLoginButton();
}

export default connect(mapStateToProps, mapActionsToProps)(LoginButton);

const useStyles = makeStyles(() => ({
  button: {
    width: 150,
    backgroundColor: '#fff',
    border: '2px solid #4285F4',
    color: '#4285F4',
    fontWeight: 500,
    borderRadius: '0.2em',
    fontSize: '1.2em',
    padding: '0.4em',
    marginRight: '2em',
    '&:hover': {
      backgroundColor: '#4285F4',
      color: '#fff',
    },
  },
}));
