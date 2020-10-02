import React from 'react';

// Firebase
import firebase, { provider } from '../../firebase';

// Libraries
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { logout, setBadgesToken, login } from '../../actions/auth.action';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapActionsToProps = {
  logout,
  setBadgesToken,
  login,
};

function LoginButton({ logout, login, setBadgesToken, user }) {
  const classes = useStyles();

  const onLoginClick = async () => {
    try {
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
    switch (user) {
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
