import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { login, setBadgesToken } from '../../actions/auth.action';

const mapStateToProps = (state) => ({
  user: state.auth,
});

function LoginButton() {
  return <Button />;
}

export default connect(mapStateToProps, mapActionsToProps)(LoginButton);
