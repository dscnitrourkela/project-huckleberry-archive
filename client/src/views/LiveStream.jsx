import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TwitchChat } from 'react-twitch-embed';

import useWindowSize from '../hooks/useWindowSize';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

function LiveStream() {
  const classes = useStyles();
  const windowSize = useWindowSize();

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
      </Grid>
    </div>
  );
}

export default LiveStream;

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
}));
