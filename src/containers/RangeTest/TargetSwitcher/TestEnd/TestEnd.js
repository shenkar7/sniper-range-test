import React, { useState, useContext, useEffect} from 'react';
import axios from '../../../../utility/axios';
import {ButtonLink} from '../../../../components/UI/Button/Button';
import TestStats from '../../../../components/TestStats/TestStats';
import AuthContext from '../../../../authContext/authContext';
import Spinner from '../../../../components/UI/Spinner/Spinner';

const TestEnd = props => {

    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    let content = <Spinner/>;
    
    useEffect(() => {
        if(authContext.state.token){
            const testData = {
                email: authContext.state.email,
                date: new Date(), 
                ranges: props.ranges,
                guessedRanges: props.guessedRanges,
                fields: props.fields
            };
            axios.post('/tests.json', testData)
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setError(<p style={{color: "red"}}>Error, test not saved.</p>);
                setIsLoading(false);
            });
        }
        else{
            setIsLoading(false);
        }
    }, [authContext.state.token, authContext.state.email, props.fields, props.guessedRanges, props.ranges]);

    if(!isLoading){
        content = (
            <React.Fragment>
                <TestStats ranges={props.ranges} guessedRanges={props.guessedRanges} fields={props.fields}/>
                {error}
                <br/>
                <ButtonLink action={props.resetTest}>Again</ButtonLink>
                <br/>
                <ButtonLink to='/'>Home</ButtonLink>
            </React.Fragment>
        );
    }
    
    return content;
}

export default TestEnd;