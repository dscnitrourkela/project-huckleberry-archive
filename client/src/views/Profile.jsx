import React, { useEffect, useState } from 'react';

// Libraries
import { Typography, Divider, Container, Grid, Button, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Components
import Card from '../components/shared/Card';
import SelfAvatar from '../components/shared/SelfAvatar';

// Redux
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';
import { fetchUser } from '../actions/auth.action';

const mapStateToProps = (state) => ({
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
  fetchUser,
};

function Profile({ profile, fetchUserBadges, fetchUser }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const paramUuid = window.location.pathname.split('/')[2];
    const uid = window.location.pathname.split('/')[3];
    if (paramUuid) {
      fetchUserBadges(paramUuid);
      fetchUser(uid);
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '1em', width: '100%' }}>
              <CopyToClipboard text={window.location.href}>
                <Button
                  aria-describedby={id}
                  className={classes.shareButton}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setTimeout(() => setAnchorEl(null), 500);
                  }}>
                  Share Profile
                </Button>
              </CopyToClipboard>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                <Typography className={classes.popover}>Profile url copied!</Typography>
              </Popover>
            </div>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '2em',
  },
  shareButton: {
    backgroundColor: '#fff',
    border: '2px solid #0F9D58',
    color: '#0F9D58',
    fontWeight: 500,
    borderRadius: '0.2em',
    fontSize: '1.2em',
    padding: '0.5em',
    margin: '0.5em',
  },
  popover: {
    padding: '0.5em',
  },
}));
