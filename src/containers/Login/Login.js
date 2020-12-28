import React, {useState, useContext} from 'react';
import Form from'../../components/Form/Form';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuthContext from '../../authContext/authContext';

const Login = () => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An error has occurred. Please try again later.");

    const authContext = useContext(AuthContext);

    if(authContext.state.token === null && isComplete)
        setIsComplete(false);

    if(authContext.state.token && !isComplete)
        setIsComplete(true);

    const loginHandler = () => {
        
        const authData = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        };

        setIsLoading(true);

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChucJCCyDp-gPlxRVay3ScQAcVW8qxuak", authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('email', response.data.email);
            authContext.setState({
                token: response.data.idToken,
                userId: response.data.localId,
                email: response.data.email
            });
            setIsLoading(false);
            setIsError(false);
            setIsComplete(true);
        })
        .catch(error => {
            const message = error.response.data.error.message;
            if(message === "INVALID_EMAIL")
                setErrorMessage("Invalid email.");
            else if(message === "INVALID_PASSWORD" || message === "EMAIL_NOT_FOUND")
                setErrorMessage("Incorrect email or password.");
            setIsLoading(false);
            setIsError(true);
        });
    };

    let content = (
        <React.Fragment>
            <Form
                button="Log in"
                clickHandler={loginHandler}
                email={{value: enteredEmail, set: setEnteredEmail}}
                password={{value: enteredPassword, set: setEnteredPassword}}
            />
        </React.Fragment>
    );

    if(isLoading){
        content = <Spinner/>;
    }
    
    if(isComplete){
        content = <p>Hello {authContext.state.email}</p>;
    }
    
    if(isError){
        content = (
            <React.Fragment>
                <Form
                    button="Log in"
                    clickHandler={loginHandler}
                    email={{value: enteredEmail, set: setEnteredEmail}}
                    password={{value: enteredPassword, set: setEnteredPassword}}
                />
                <p style={{color: "red"}}>{errorMessage}</p>
            </React.Fragment>
        );
    }

    return(
        <div>
            {content}
        </div>
    );
}

export default Login;