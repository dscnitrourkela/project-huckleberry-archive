import React, { useEffect } from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { TwitchChat } from 'react-twitch-embed';
import Countdown, { zeroPad } from 'react-countdown';

import useWindowSize from '../hooks/useWindowSize';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

// Redux
import { connect } from 'react-redux';
import { countDownBadge, counterFirstLoad } from '../actions/badges.action';

const mapStateToProps = (state) => ({
  firstLoad: state.badges.firstLoad,
});

const mapActionsToProps = {
  countDownBadge,
  counterFirstLoad,
};

function LiveStream({ countDownBadge, counterFirstLoad, firstLoad }) {
  const classes = useStyles();
  const windowSize = useWindowSize();

  useEffect(() => {
    counterFirstLoad(true);
  }, []);

  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );

  const onCounterComplete = () => {
    if (localStorage.getItem('uuid')) {
      countDownBadge();
      counterFirstLoad(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <Paper elevation={2} className={windowSize.width > 700 ? classes.videoplayer : classes.videoPlayerMobile}>
            <VideoPlayer url='https://www.twitch.tv/dscnitrourkela' controls={true} width='100%' />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper elevation={2} className={windowSize.width > 700 ? classes.chatContainer : classes.chatContainerMobile}>
            <TwitchChat channel='dscnitrourkela' theme='dark' className={classes.chat} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          lg={9}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant='h5' style={{ marginTop: 10 }}>
            Sign In to get some exciting badges! Exclusive badge will be sent to you in{' '}
          </Typography>
          {<ArrowForwardIcon style={{ margin: 15 }} />}
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          {firstLoad && (
            <Button className={classes.countdown}>
              <Countdown
                date={Date.now() + 10000}
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
    height: '100%',
    borderRadius: '0.5em',
    display: 'flex',
    alignItems: 'center',
  },
  chatContainerMobile: {
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
    marginTop: '0.4em',
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
}));
