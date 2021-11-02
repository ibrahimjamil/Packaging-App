import './App.css';
import Home from './views/Home';
import routes, { BASE_URL } from './routes'
import {FunctionComponent, useContext} from 'react';
import { Redirect, withRouter,Route, Switch as Routes} from 'react-router-dom';
import { AuthenticateContext } from './views/Authentication/Authenticate';

const  App:FunctionComponent = () => {
  const authContext = useContext(AuthenticateContext)
  return ( 
      <Routes>
          <Redirect exact from="/" to={BASE_URL + '/credentials/'}/>   
          <Route exact key={ BASE_URL + '/credentials/'} path={ BASE_URL + '/credentials/'} component={Home} />
            {!!authContext?.isAuthenticated && routes?.map((route) => {
              return  <Route exact key={route.path} path={route.path} component={route.component} />
            })}
      </Routes>
  );
}

export default withRouter(App);
