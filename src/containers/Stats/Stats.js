import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../../authContext/authContext';
import {ButtonLink} from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../utility/axios';
import TestBlock from './TestBlock/TestBlock';

const Stats = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tests, setTests] = useState(null);
    const authContext = useContext(AuthContext);

    let content = <Redirect to="/"/>;

    useEffect(() => {

        if(authContext.state.token){
            // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            const queryParams = '?auth=' + authContext.state.token + '&orderBy="email"&equalTo="' + authContext.state.email + '"';
            axios.get('/tests.json' + queryParams)
            .then(res => {
                const testsArray = [];
                for(let key in res.data){
                    testsArray.push({
                        date: res.data[key].date,
                        ranges: res.data[key].ranges,
                        fields: res.data[key].fields,
                        guessedRanges: res.data[key].guessedRanges
                    });
                }
                testsArray.reverse();
                setTests(testsArray);
                setIsLoading(false);

            })
            .catch(err => {
                setIsError(true);
                setIsLoading(false);
            });
        }

    },[authContext.state]);

    if(authContext.state.token){
        if(isLoading){
            content = <Spinner/>;
        }
        else if(isError)
            content = <p>An error has occured</p>;
        else{

            const testsTables = tests.map(test => {
                return <TestBlock key={test.date} date={test.date} ranges={test.ranges} fields={test.fields} guessedRanges={test.guessedRanges}/>
            });

            content = (
                <React.Fragment>
                    <h2>Average Score: __</h2>
                    <br/>
                    Average Day Score: __
                    <br/>
                    Average Night Score: __
                    <br/>
                    Average Thermal Score: __
                    <br/>
                    <br/>
                    <ButtonLink to='/'>Back</ButtonLink>
                    <br/>
                    {testsTables}
                </React.Fragment>
            );
        }

    }

    return content;
};

export default Stats;