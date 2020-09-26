import React from 'react';

function Chat({ url, parent }) {
  return <iframe parent={[parent]} style={{ borderRadius: '0.5em' }} src={url} height='90%' width='100%'></iframe>;
}

export default Chat;
