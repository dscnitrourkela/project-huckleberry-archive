import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TwitchChat } from 'react-twitch-embed';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

function LiveStream() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <Paper elevation={2} className={classes.videoplayer}>
            <VideoPlayer url='https://www.twitch.tv/dscnitrourkela' controls={true} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper elevation={2} className={classes.chat}>
            <h1 style={{ margin: 0 }}>Chat</h1>
            <TwitchChat channel='dscnitrourkela' theme='dark' />
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
    height: '60vh',
    borderRadius: '0.5em',
    padding: '1em',
  },
  chat: {
    height: '100%',
    padding: '1em',
    borderRadius: '0.5em',
  },
}));
