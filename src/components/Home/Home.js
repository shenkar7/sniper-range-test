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
            </header>
            <Login/>
            {authContext.state.token 
            ? <ButtonSmallLink click={props.logout}>logout</ButtonSmallLink>
            : <ButtonSmallLink to='/signup'>Sign up</ButtonSmallLink>
            }
            <br/>
            <div className={classes.Menu}>
                <ButtonLink to='/rangetest'>Demo</ButtonLink>
            </div>
        </main>
    );

    return content;
}

export default Home;