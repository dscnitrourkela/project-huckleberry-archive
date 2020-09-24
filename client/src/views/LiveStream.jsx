import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Components
import VideoPlayer from '../components/livestream/VideoPlayer';

function LiveStream() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={8}>
          <Paper elevation={2} className={classes.videoplayer}>
            <VideoPlayer url='https://www.twitch.tv/arab' controls={true} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper elevation={2} className={classes.chat}>
            <h1 style={{ margin: 0 }}>Chat</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default LiveStream;

// const useStyles = makeStyles((theme) => ({

// })

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  videoplayer: {
    height: '60vh',
    borderRadius: '1em',
  },
  chat: {
    height: '100',
    margin: 0,
  },
}));
