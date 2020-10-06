import React, { useEffect, useState } from 'react';

// Libraries
import { Typography, Divider, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Card from '../components/shared/Card';
import SelfAvatar from '../components/shared/SelfAvatar';

// Redux
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';

const mapStateToProps = (state) => ({
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
};

function Profile({ profile, fetchUserBadges }) {
  const classes = useStyles();

  useEffect(() => {
    const paramUuid = window.location.pathname.split('/')[2];
    console.log(paramUuid);
    if (paramUuid) {
      fetchUserBadges(paramUuid);
    }
  }, []);

  switch (profile) {
    case undefined || null:
      return <h2>Loading...</h2>;
    default:
      return (
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} md={12} lg={8} className={classes.badgesContainer}>
            <Typography variant='h4' className={classes.typography}>
              Badges
            </Typography>
            {profile.length === 0 ? (
              <h3>No Badges Yet!</h3>
            ) : (
              <Container className={classes.badges}>
                {profile.map((badge, index) => (
                  <Card
                    image={badge.image}
                    name={badge.name.split('/')[0]}
                    description={badge.name.split('/')[1]}
                    key={index}
                  />
                ))}
              </Container>
            )}
            <Divider orientation='vertical' />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <SelfAvatar alt='img' />
          </Grid>
        </Grid>
      );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  badgesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '60%',
  },
  badges: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  typography: {
    width: 'auto',
    fontFamily: '"Open Sans", sans-serif',
    marginBottom: '1em',
    textAlign: 'center',
  },
}));
