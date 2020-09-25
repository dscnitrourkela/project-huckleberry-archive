import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const SelfAvatar = ({ alt, user, src }) => {
  const classes = useStyles();
  return (
    <div className={classes.avatarContainer}>
      <Avatar alt={alt} src={user ? user.photoURL : CURRENT_USER_DATA.photoURL} className={classes.large} />
      <h4>{user ? user.displayName : CURRENT_USER_DATA.displayName}</h4>
    </div>
  );
};

export default connect(mapStateToProps)(SelfAvatar);

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    marginTop: '6em',
    marginBottom: '3em',
    width: '100%',
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5em 0',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: '0.5em',
  },
}));
