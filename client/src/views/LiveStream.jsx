import React, { useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TwitchChat } from 'react-twitch-embed';
import Countdown, { zeroPad } from 'react-countdown';

import useWindowSize from '../hooks/useWindowSize';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

// Redux
import { connect } from 'react-redux';
import { countDownBadge } from '../actions/badges.action';

const mapActionsToProps = {
  countDownBadge,
};

function LiveStream({ countDownBadge }) {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const [reload, setReload] = useState(false);

  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );

  const onCounterComplete = () => {
    if (localStorage.getItem('uuid')) {
      countDownBadge();
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
        <Grid item xs={12} md={12} lg={12}>
          <Button className={classes.countdown}>
            <Countdown
              date={Date.now() + 900000}
              style={{ margin: '1em' }}
              renderer={renderer}
              onComplete={onCounterComplete}
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(() => {}, mapActionsToProps)(LiveStream);

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
