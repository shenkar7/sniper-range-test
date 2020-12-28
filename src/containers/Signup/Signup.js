import React, {useState} from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import {ButtonSmallLink} from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

const Signup = props => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const signupHandler = () => {
        
        const authData = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        };

        setIsLoading(true);

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChucJCCyDp-gPlxRVay3ScQAcVW8qxuak", authData)
        .then(response => {
            setIsLoading(false);
            setIsComplete(true);
        })
        .catch(error => {
            setIsLoading(false);
            setIsError(true);
        });
    };

    let content = (
        <React.Fragment>
            <p>Please enter your info</p>
            <Form
                button="Sign up"
                clickHandler={signupHandler}
                email={{value: enteredEmail, set: setEnteredEmail}}
                password={{value: enteredPassword, set: setEnteredPassword}}
            />
        </React.Fragment>
    );

    if(isLoading){
        content = <Spinner/>;
    }
    
    if(isComplete){
        content =  <p>Sign up Completed</p>;
    }
    
    if(isError){
        content = <p style={{color: "red"}}>An error has occurred. Please try again later.</p>;
    }

    return (
        <div>
            {content}
            <ButtonSmallLink to='/'>Back to home page</ButtonSmallLink>
        </div>
    );
}

export default Signup;