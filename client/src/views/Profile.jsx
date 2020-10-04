import React, { useEffect, useState } from 'react';

// Libraries
import { Typography, Divider, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Card from '../components/shared/Card';
import SelfAvatar from '../components/shared/SelfAvatar';

// constants
import { API } from '../constants/api';

// Redux
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';
import { login } from '../actions/auth.action';
import axios from 'axios';

const mapStateToProps = (state) => ({
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
  login,
};

function Profile({ profile, fetchUserBadges, login }) {
  const classes = useStyles();

  useEffect(() => {
    const paramUuid = window.location.pathname.split('/')[2];
    const accessToken = window.location.pathname.split('/')[3];
    if (paramUuid) {
      fetchUserBadges(paramUuid);
    }
  }, []);

  switch (profile) {
    case undefined:
      return <h2>Loading...</h2>;
    default:
      return (
        <div className={classes.container}>
          <div className={classes.badgesContainer}>
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
          </div>
          <Divider orientation='vertical' />
          <div>
            <SelfAvatar alt='img' />
          </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const useStyles = makeStyles(() => ({
  container: {
    height: '70vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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
