import {Button} from '../UI/Button/Button';
import React, {useState, useEffect} from 'react';

const Countdown = React.memo(props => {

    const [timeLeft, setTimeLeft] = useState(props.time);
    const [stop, setStop] = useState(false);

    useEffect(() =>{

        if(stop){
            props.countdownEnd();
        }
        else if(timeLeft <= 0){
            setStop(true);
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => (prevTimeLeft - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, stop, props]);

    return (
        <div>
            <Button clicked={() => setStop(true)}>{props.text} ({timeLeft})</Button>
        </div>
    );
});

export default Countdown;