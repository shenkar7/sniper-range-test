import React, {useState} from 'react';
import classes from './App.module.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import RangeTest from './containers/RangeTest/RangeTest';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import AuthContext from './authContext/authContext';
import {ButtonLink, ButtonSmallLink} from './components/UI/Button/Button';

const App = () => {

  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email')
  });

  //////////////// userId unnecessary?

  // add auto login if token is still valid
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

  const home = (
    <main>
      <header>
        <h1>SNIPER RANGE TEST</h1>
        <p className={classes.homeText}>
          Test your ability to estimate the range of a target based on your reticle only.
          </p>
      </header>
      <Login/>
      {authState.token 
      ? <ButtonSmallLink click={logout}>logout</ButtonSmallLink>
      : <ButtonSmallLink to='/signup'>Sign up</ButtonSmallLink>
      }
      <br/>
      <div className={classes.Menu}>
        <ButtonLink className={classes.Link} to='/rangetest'>Demo</ButtonLink>
      </div>
    </main>
  );

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
