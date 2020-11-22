import React from 'react';
import { Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const SelfAvatar = ({ user }) => {
  const classes = useStyles();

  switch (user) {
    case undefined:
      return <h3>Loading...</h3>;
    case null:
      return (
        <div style={{ widht: '100%', height: '20em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HashLoader size={50} color='#DB4437' />
        </div>
      );
    default:
      return (
        <Card className={classes.root} variant='outlined'>
          <CardActionArea>
            <CardMedia component='img' alt='Profile Image' height='auto' image={user.photoURL} title='Profile Image' />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' className={classes.typography}>
                {user.displayName}
              </Typography>
              <Typography variant='body2' color='textSecondary' className={classes.typography}>
                Email: {user.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
};

export default connect(mapStateToProps)(SelfAvatar);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    marginBottom: '1em',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));
