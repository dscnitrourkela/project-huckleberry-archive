import React from 'react';

// Libraries
import ReactPlayer from 'react-player';

function VideoPlayer({ url, controls, height, width }) {
  return (
    <ReactPlayer
      style={{ borderRadius: '0.5em', padding: '1em', backgroundColor: '#000' }}
      wrapper='div'
      url={url}
      controls={controls}
      width={width}
      height='100%'
    />
  );
}

export default VideoPlayer;
