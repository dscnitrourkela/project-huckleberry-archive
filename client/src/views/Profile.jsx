import React, { useEffect, useState } from 'react';

// Libraries
import { Typography, Divider, Container, Grid, Button, Popover } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";

import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Components
import Card from '../components/shared/Card';
import SelfAvatar from '../components/shared/SelfAvatar';

// Redux
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';
import { fetchUser, setProfileStatus } from '../actions/auth.action';

const mapStateToProps = state => ({
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
  fetchUser,
  setProfileStatus,
};

function Profile({ profile, fetchUserBadges, fetchUser, setProfileStatus }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let paramUuid, uid;
  const shareUrlArray = window.location.href.split('/');
  shareUrlArray.pop();
  shareUrlArray.push('shared');
  const shareUrl = shareUrlArray.join('/');

  useEffect(() => {
    paramUuid = window.location.pathname.split('/')[2];
    uid = window.location.pathname.split('/')[3];
    const status = window.location.pathname.split('/')[4];

    if (paramUuid && uid) {
      fetchUserBadges(paramUuid);
      fetchUser(uid);
      status === 'shared' ? setProfileStatus('shared') : setProfileStatus('own');
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
              <div style={{ widht: '100%', height: '20em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <HashLoader size={50} color='#DB4437' />
              </div>
            ) : (
              <Container className={classes.badges}>
                {profile.map((badge, index) => {
                  console.log(badge.name)
                  
                  return (
                    <Card
                      image={badge.image}
                      name={badge.name.split('/')[0]}
                      description={badge.name.split('/')[1]}
                      key={index}
                    />
                  )
                })}
              </Container>
            )}
          </Grid>

          <Grid item xs={12} md={12} lg={4} className={classes.profileContainer}>
            <SelfAvatar alt='img' />

            {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '1em', width: '100%' }}>
              <CopyToClipboard text={shareUrl}>
                <Button
                  aria-describedby={id}
                  className={classes.shareButton}
                  onClick={event => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Checkout my awesome badge at DSC NIT Rourkela',
                        text: 'Excited to share the latest badge from @dscnitrourkela I have earned for <> at <>. Earn yours at next event by #dscnitrourkela',
                        url: shareUrl
                      }).then(() => {
                        console.log('Thanks for sharing!');
                      })
                      .catch(err => {
                        console.log(`Couldn't share because of`, err.message);
                      });
                    } else {
                      setAnchorEl(event.currentTarget);
                      //setTimeout(() => setAnchorEl(null), 500);
                    }                    
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
                {/* <Typography className={classes.popover}>Profile URL copied!</Typography> 
              </Popover>
            </div> */}
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
