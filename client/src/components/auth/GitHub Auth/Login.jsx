import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant='outlined' color='primary' onClick={() => loginWithRedirect()}>
      Log In With GitHub
    </Button>
  );
};

export default LoginButton;
