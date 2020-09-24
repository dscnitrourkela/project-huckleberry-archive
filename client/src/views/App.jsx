import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Sidebar from '../components/marginals/Sidebar';

function App() {
  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      <Route path={`/profile`} exact>
        <Profile />
      </Route>
      <Redirect to={`/livestream`} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Sidebar>{renderRoutes()}</Sidebar>
    </BrowserRouter>
  );
}

export default App;
