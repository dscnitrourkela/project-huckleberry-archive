import React from 'react';

// Libraries
import ReactPlayer from 'react-player';

function VideoPlayer({ url, controls }) {
  return <ReactPlayer style={{ borderRadius: '1em' }} url={url} controls={controls} width='100%' height='100%' />;
}

export default VideoPlayer;
