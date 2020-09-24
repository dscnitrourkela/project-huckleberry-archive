import React from 'react';

function Chat({ url }) {
  return <iframe style={{ borderRadius: '0.5em' }} src={url} height='91%' width='100%'></iframe>;
}

export default Chat;
