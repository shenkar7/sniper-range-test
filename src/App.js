import React, {useState} from 'react';
import classes from './App.module.css';
import {HashRouter, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import RangeTest from './containers/RangeTest/RangeTest';
import Signup from './containers/Signup/Signup';
import AuthContext from './authContext/authContext';
import Home from './components/Home/Home';

const App = () => {

  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email')
  });

  //////////////// is userId unnecessary?

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    setAuthState({
        token: null,
        userId: null,
        email: null
    });
  }

  const expirationDate = new Date (localStorage.getItem('expirationDate'));

  if(authState.token && expirationDate <= new Date()){
    logout();
  }

  const home = <Home logout={logout}/>;

  let routes = (
    <Switch>
      <Route path='/rangetest' exact component={RangeTest}/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/' exact render={() => home}/>
      <Redirect to='/'/>
    </Switch>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{state: authState, setState: setAuthState}}>
        <div className={classes.App}>
          {routes}
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );

};

export default App;
