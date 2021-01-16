import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../../authContext/authContext';
import {ButtonLink} from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../utility/axios';
import TestBlock from './TestBlock/TestBlock';
import {calculateScore, filterRangesByVision} from '../../utility/utility';

const Stats = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tests, setTests] = useState(null);
    const [avgScore, setAvgScore] = useState(null);
    const [visionsScore, setVisionsScore] = useState(null);
    const authContext = useContext(AuthContext);

    let content = <Redirect to="/"/>;

    useEffect(() => {

        if(authContext.state.token){
            // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            const queryParams = '?auth=' + authContext.state.token + '&orderBy="email"&equalTo="' + authContext.state.email + '"';
            axios.get('/tests.json' + queryParams)
            .then(res => {
                const testsArray = [];
                let day = {ranges: [], guesses: []};
                let night = {ranges: [], guesses: []};
                let thermal = {ranges: [], guesses: []};
                let sum = 0;
                for(let key in res.data){
                    testsArray.push({
                        date: res.data[key].date,
                        ranges: res.data[key].ranges,
                        fields: res.data[key].fields,
                        guessedRanges: res.data[key].guessedRanges
                    });
                    sum += calculateScore(res.data[key].ranges, res.data[key].guessedRanges);

                    day.ranges = [...day.ranges, ...filterRangesByVision(res.data[key].ranges, res.data[key].fields, "d")];
                    night.ranges = [...night.ranges, ...filterRangesByVision(res.data[key].ranges, res.data[key].fields, "n")];
                    thermal.ranges = [...day.ranges, ...filterRangesByVision(res.data[key].ranges, res.data[key].fields, "t")];

                    day.guesses = [...day.guesses, ...filterRangesByVision(res.data[key].guessedRanges, res.data[key].fields, "d")];
                    night.guesses = [...night.guesses, ...filterRangesByVision(res.data[key].guessedRanges, res.data[key].fields, "n")];
                    thermal.guesses = [...day.guesses, ...filterRangesByVision(res.data[key].guessedRanges, res.data[key].fields, "t")];
                }

                testsArray.reverse();
                setVisionsScore({
                    day: calculateScore(day.ranges, day.guesses),
                    night: calculateScore(night.ranges, night.guesses),
                    thermal: calculateScore(thermal.ranges, thermal.guesses)
                });
                setAvgScore(sum/testsArray.length)
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
                    <h2>Average Score: {avgScore}/100</h2>
                    <br/>
                    Day Accuracy: {visionsScore.day}%
                    <br/>
                    Night Accuracy: {visionsScore.night}%
                    <br/>
                    Thermal Accuracy: {visionsScore.thermal}%
                    <br/>
                    <br/>
                    {testsTables}
                    <br/>
                    <ButtonLink to='/'>Back</ButtonLink>
                </React.Fragment>
            );
        }

    }

    return content;
};

export default Stats;