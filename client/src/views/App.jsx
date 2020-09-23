import React from 'react';
import { Router, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

// Hooks
import createBrowserHistory from '../history';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';

function App() {
  const { path } = useRouteMatch();

  const renderRoutes = () => (
    <Switch>
      <Route path={`${path}/livestream`}>
        <LiveStream />
      </Route>
      <Route path={`${path}/profile`}>
        <Profile />
      </Route>
      <Redirect to={`${path}/livestream`} />
    </Switch>
  );

  return <Router history={createBrowserHistory}>{renderRoutes()}</Router>;
}

export default App;
