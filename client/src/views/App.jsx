import React,{useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Hooks
// import createBrowserHistory from '../history';

// Components
import LiveStream from './LiveStream';
import Profile from './Profile';
import Login from './Login';
import Sidebar from '../components/marginals/Sidebar';

function App() {
  // const { path } = useRouteMatch();
  const [isAuth,setAuth]=useState(false);
  const [userToken,setUserToken]=useState("");
  const renderRoutes = () => (
    <Switch>
      <Route path={`/livestream`} exact>
        <LiveStream />
      </Route>
      <Route path={`/profile`} exact>
        <Profile userToken={userToken} />
      </Route>  
      <Route path={`/login`} exact>
        <Login setUserToken={setUserToken} isAuth={isAuth} setAuthVal={setAuth} />
      </Route>      
      <Redirect to={`/livestream`} />
    </Switch>
  );
  // history={createBrowserHistory}
  return (
    <BrowserRouter>
      <Sidebar isAuth={isAuth} >{renderRoutes()}</Sidebar>
    </BrowserRouter>
  );
}

export default App;
