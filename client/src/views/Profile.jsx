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
              <div style={{ widht: '100%' }}>
                <h3>No Badges Yet!</h3>
              </div>
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
          </Grid>

          <Grid item xs={12} md={12} lg={4} class={classes.profileContainer}>
            <SelfAvatar alt='img' />
          </Grid>
          {/* <Divider orientation='vertical' /> */}
        </Grid>
      );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '90vh',
  },
  badgesContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  typography: {
    width: 'auto',
    fontFamily: '"Open Sans", sans-serif',
    marginBottom: '1em',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '2em',
  },
}));
