import React, { useEffect } from 'react';

// Material-ui
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Libraries
import { TwitchChat } from 'react-twitch-embed';
import Countdown, { zeroPad } from 'react-countdown';

// Hooks
import useWindowSize from '../hooks/useWindowSize';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

// Redux
import { connect } from 'react-redux';
import { countDownBadge, counterFirstLoad } from '../actions/badges.action';

const mapStateToProps = (state) => ({
  firstLoad: state.badges.firstLoad,
  user: state.auth.user,
});

const mapActionsToProps = {
  countDownBadge,
  counterFirstLoad,
};

function LiveStream({ countDownBadge, counterFirstLoad, firstLoad }) {
  const classes = useStyles();
  const windowSize = useWindowSize();

  // Counter minutes and seconds renderer
  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );

  const onCounterComplete = () => {
    if (user) {
      countDownBadge(localStorage.getItem('uuid'));
      counterFirstLoad(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Paper elevation={2} className={windowSize.width > 850 ? classes.videoplayer : classes.videoPlayerMobile}>
            <VideoPlayer url='https://www.twitch.tv/dscnitrourkela' controls={true} width='100%' />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Paper elevation={2} className={classes.chatContainer}>
            <TwitchChat channel='dscnitrourkela' theme='dark' className={classes.chat} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9} lg={9} className={classes.heading}>
          <Typography variant='h5' className={classes.headingTypography}>
            Signin to get some exciting badges! Exclusive badge will be sent to you in{' '}
          </Typography>
          {<ArrowForwardIcon style={{ margin: 15, color: '#757575' }} />}
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          {firstLoad && (
            <Button className={classes.countdown}>
              <Countdown
                date={Date.now() + 900000}
                style={{ margin: '1em' }}
                renderer={renderer}
                onComplete={onCounterComplete}
              />
            </Button>
          )}
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
  countdown: {
    width: 150,
    backgroundColor: '#fff',
    border: '2px solid #4285F4',
    color: '#4285F4',
    fontWeight: 500,
    borderRadius: '0.2em',
    fontSize: '1.2em',
    padding: '0.6em',
    marginRight: '2em',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTypography: {
    marginTop: 10,
    color: '#757575',
  },
}));
