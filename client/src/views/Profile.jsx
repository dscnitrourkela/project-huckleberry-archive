import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';
import { Typography, Divider, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../components/shared/Card';
import SelfAvatar from '../components/shared/SelfAvatar';

const mapStateToProps = (state) => ({
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
};

function Profile({ profile, fetchUserBadges, user }) {
  const classes = useStyles();

  useEffect(() => {
    const paramUuid = window.location.pathname.split('/')[2];
    if (paramUuid) {
      fetchUserBadges(paramUuid);
    }
  }, []);

  switch (profile) {
    case undefined:
      return <h2>Loading...</h2>;
    default:
      return (
        <div style={{ height: '70vh' }}>
          <SelfAvatar alt='img' />
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant='h4' className={classes.typography}>
              Badges
            </Typography>
            {profile.badges.length === 0 ? (
              <h3>No Badges Yet!</h3>
            ) : (
              <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {profile.badges.map((each, index) => (
                  <Card image={each.image} name={each.name} key={index}>
                    badge
                  </Card>
                ))}
              </Container>
            )}
          </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const useStyles = makeStyles(() => ({
  typography: {
    width: 'auto',
    fontFamily: '"Open Sans", sans-serif',
    marginBottom: '1em',
    textAlign: 'center',
  },
}));
