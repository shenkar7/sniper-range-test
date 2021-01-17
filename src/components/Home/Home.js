import React, {useContext} from 'react';
import AuthContext from '../../authContext/authContext';
import classes from './Home.module.css';
import Login from '../../containers/Login/Login';
import {ButtonLink, ButtonSmallLink} from '../UI/Button/Button';

const Home = props => {

    const authContext = useContext(AuthContext);

    const content = (
        <main>
            <header>
                <h1>SNIPER RANGE TEST</h1>
                <p className={classes.homeText}>Estimate the range of a targets with your reticle only.</p>
                {authContext.state.token
                ? null
                : <React.Fragment>
                    <p className={classes.guestText}>
                        Use as guest, sign up or use the demo user:
                    </p>
                    <p className={classes.mailPassText}>
                        Email: asd@asd.com<br/>
                        Password: asdasdasd
                    </p>
                  </React.Fragment>
                  
                }
            </header>
            <Login/>
            {authContext.state.token 
            ? <ButtonSmallLink click={props.logout}>logout</ButtonSmallLink>
            : <ButtonSmallLink to='/signup'>Sign up</ButtonSmallLink>
            }
            <br/>
            <div className={classes.Menu}>
                {authContext.state.token
                ? <React.Fragment>
                    <ButtonLink to='/rangetest'>Start Test</ButtonLink>
                    <br/>
                    <ButtonLink to='/stats'>Statistics</ButtonLink>
                  </React.Fragment>
                : <ButtonLink to='/rangetest'>Guest Demo</ButtonLink>
                }
            </div>
        </main>
    );

    return content;
}

export default Home;