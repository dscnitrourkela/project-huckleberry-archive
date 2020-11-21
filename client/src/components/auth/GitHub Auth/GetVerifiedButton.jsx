import React from 'react';

// Libraries
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';

import LoginButton from './Login'
import LogoutButton from './Logout'
import Profile from './Profile'

import { useAuth0 } from "@auth0/auth0-react";


const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile_status: state.auth.profile_status,
});


function LoginButtonFn({ user, profile_status}) {
  const classes = useStyles();

  const { userAuth0, isAuthenticated, isLoading } = useAuth0();

  const renderLoginButton = () => {
    if (profile_status === 'shared') {
      return (
          <Button variant="outlined" disabled>
  Login to verify
</Button>
      );
    }
    switch (user) {
      case undefined:
        return <h1>Loading...</h1>;
      case null:
        return (
            <Button variant="outlined" disabled>
  Login to verify
</Button>
        );
      default:
        return (
            isAuthenticated ? <LogoutButton /> : <LoginButton />
        );
    }
  };

  return renderLoginButton();
}

export default connect(mapStateToProps)(LoginButtonFn);

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
