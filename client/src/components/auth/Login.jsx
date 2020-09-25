import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { login, setBadgesToken, logout } from '../../actions/auth.action';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  badge_token: state.auth.badge_token,
});

const mapActionsToProps = {
  login,
  setBadgesToken,
  logout,
};

function LoginButton({ login, setBadgesToken, user, logout }) {
  useEffect(() => {
    if (!localStorage.getItem('uuid')) {
      setBadgesToken(localStorage.getItem('g_uuid'));
    }
  }, []);

  const renderLoginButton = () => {
    switch (user) {
      case undefined:
        return (
          <Button variant='container' color='primary' onClick={login}>
            Sign in with Google
          </Button>
        );
      default:
        return (
          <Button variant='container' color='primary' onClick={logout}>
            Logout
          </Button>
        );
    }
  };

  return renderLoginButton();
}

export default connect(mapStateToProps, mapActionsToProps)(LoginButton);
