import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const SelfAvatar = ({ alt, user }) => {
  const classes = useStyles();

  switch (localStorage.getItem('displayName')) {
    case undefined:
      return <h3>Loading...</h3>;
    case null:
      return <h3>User not logged in</h3>;
    default:
      return (
        <div className={classes.avatarContainer}>
          <Typography variant='h3' className={classes.typography}>
            {user.displayName}
          </Typography>
          <Avatar alt={alt} src={user.photoURL} className={classes.large} />
        </div>
      );
  }
};

export default connect(mapStateToProps)(SelfAvatar);

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    marginTop: '1em',
    marginBottom: '3em',
    width: '100%',
    minHeight: '3em',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5em 0',
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(35),
    marginBottom: '0.5em',
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    marginBottom: '1em',
  },
}));
