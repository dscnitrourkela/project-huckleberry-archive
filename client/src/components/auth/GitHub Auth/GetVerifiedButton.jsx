import React from 'react';

// Libraries
import { Button } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';

import LoginButton from './Login';
import LogoutButton from './Logout';
import Profile from './Profile';

import { useAuth0 } from '@auth0/auth0-react';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile_status: state.auth.profile_status,
});

function LoginButtonFn({ user, profile_status }) {
  const { userAuth0, isAuthenticated, isLoading } = useAuth0();

  const renderLoginButton = () => {
    if (profile_status === 'shared') {
      return (
        <Button variant='outlined' disabled>
          Login to verify
        </Button>
      );
    }
    switch (user) {
      case undefined:
        return <h1>Loading...</h1>;
      case null:
        return (
          <Button variant='outlined' disabled>
            Login to verify
          </Button>
        );
      default:
        return isAuthenticated ? (
          <>
            <LogoutButton /> <Profile />
          </>
        ) : (
          <LoginButton />
        );
    }
  };

  return renderLoginButton();
}

export default connect(mapStateToProps)(LoginButtonFn);
