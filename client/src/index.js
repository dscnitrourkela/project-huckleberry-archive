import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { Auth0Provider } from "@auth0/auth0-react";


import App from './views/App';
import Root from './Root';

ReactDOM.render(
  <Auth0Provider
  domain="dscnitrourkela.us.auth0.com"
  clientId="dZp4UruPpbknhkZubAybbhFYoljghXoz"
  redirectUri={window.location.origin}
>
  <Root>
    <App />
  </Root>
  </Auth0Provider>,
  document.getElementById('root')
);
