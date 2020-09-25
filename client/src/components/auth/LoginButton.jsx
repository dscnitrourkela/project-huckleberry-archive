import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../../actions/auth.action';
import firebase from '../../firebase';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  uuid: state.auth.uuid,
});

const mapActionsToProps = {
  logout,
};

function LoginButton({ logout, uuid }) {
  const classes = useStyles();
  let provider;

  useEffect(() => {
    provider = new firebase.auth.GoogleAuthProvider();
  }, []);

  const onLoginClick = () => {
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
