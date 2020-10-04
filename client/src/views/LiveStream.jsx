import React from 'react';

// Material-ui
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Hooks
import useWindowSize from '../hooks/useWindowSize';

// Constants
import { API } from '../constants/api';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';
import Countdown from '../components/livestream/Countdown';

// Redux
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapActionsToProps = {};

function LiveStream({ user }) {
  const classes = useStyles();
  const windowSize = useWindowSize();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Paper elevation={2} className={windowSize.width > 850 ? classes.videoplayer : classes.videoPlayerMobile}>
            <VideoPlayer url={API.LIVESTREAM.TWITCH} controls={true} width='100%' />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Paper elevation={2} className={classes.chatContainer}>
            <iframe
              src={API.LIVESTREAM.SLIDO}
              height='100%'
              width='100%'
              frameBorder='0'
              style={{ borderRadius: 10 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Typography variant='h5' className={classes.headingTypography}>
            Signin to get some exciting badges! Exclusive badge will be sent to you in <Countdown />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(LiveStream);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  videoplayer: {
    borderRadius: '0.5em',
    height: '60vh',
  },
  videoPlayerMobile: {
    borderRadius: '0.5em',
    height: '35vh',
  },
  chatContainer: {
    width: '100%',
    height: '60vh',
    borderRadius: '0.5em',
    display: 'flex',
    alignItems: 'center',
  },
  chat: {
    width: '100%',
    height: '100%',
    borderRadius: '0.5em',
  },
  headingTypography: {
    marginTop: 10,
    color: '#757575',
  },
}));
