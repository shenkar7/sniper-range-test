import React from 'react';
import Input from '../UI/Input/Input';
import {Button} from '../UI/Button/Button';

const Form = props => {
    return (
        <div>
            <Input label="Email:" value={props.email.value} type='email' inputOnChangeHandler={event => props.email.set(event.target.value)}/>
            <Input label="Password:" value={props.password.value} type='password' inputOnChangeHandler={event => props.password.set(event.target.value)}/>
            <Button clicked={props.clickHandler}>{props.button}</Button>
        </div>
    );
};

export default Form;