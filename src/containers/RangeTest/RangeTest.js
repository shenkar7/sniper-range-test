import React, {useState, useContext} from 'react';
import Countdown from '../../components/Countdown/Countdown';
import {Button} from '../../components/UI/Button/Button';
import TargetSwitcher from './TargetSwitcher/TargetSwitcher';
import classes from './RangeTest.module.css';
import AuthContext from '../../authContext/authContext';
import {creatingRandomRangesArray, creatingRandomFieldsArray} from '../../utility/utility';
import * as c from '../../utility/constants';

const RangeTest = props => {

    const authContext = useContext(AuthContext);

    let defaultLevel;
    if(authContext.state.token)
        defaultLevel = c.CONNECTED_USER_LEVEL;
    else
        defaultLevel = c.DEFAULT_LEVEL;

    const [isReady, setIsReady] = useState(false);
    const [isCountDown, setIsCountdown] = useState(true);
    const [level, setLevel] = useState(defaultLevel);

    let content = (
        <div>
            <h3>Ready?</h3>
            {authContext.state.token
            ?   null
            :   <div className={classes.levels}>
                    <input type="radio"
                        id="Beginner"
                        name="level"
                        value="Beginner"
                        checked={level === "Beginner"}
                        onChange={event => setLevel(event.target.value)}
                    />
                    <label htmlFor="Beginner">Beginner ({c.BEGINNER_TIME} sec)</label>
                    <br/>
                    <input type="radio"
                        id="Intermediate"
                        name="level"
                        value="Intermediate"
                        checked={level === "Intermediate"}
                        onChange={event => setLevel(event.target.value)}
                    />
                    <label htmlFor="Intermediate">Intermediate ({c.INTERMEDIATE_TIME} sec)</label>
                    <br/>
                    <input type="radio"
                        id="Experienced"
                        name="level"
                        value="Experienced"
                        checked={level === "Experienced"}
                        onChange={event => setLevel(event.target.value)}
                    />
                    <label htmlFor="Experienced">Experienced ({c.EXPERIENCED_TIME} sec)</label>
                </div>
            }
            <Button clicked={() => setIsReady(true)}>START</Button>
        </div>
    );

    if(isReady){
        content = 
            <div>
                <br/>
                <Countdown time={c.READY_COUNTDOWN_TIME} countdownEnd={() => setIsCountdown(false)} text="skip"/>
            </div>
    }

    if (!isCountDown) {

        let ranges = creatingRandomRangesArray();

        let fields = creatingRandomFieldsArray(ranges);

        let countdownTime;
        switch(level){
            case 'Beginner':
                countdownTime = c.BEGINNER_TIME;
                break;
            case 'Intermediate':
                countdownTime = c.INTERMEDIATE_TIME;
                break;
            case 'Experienced':
                countdownTime = c.EXPERIENCED_TIME;
                break;
            default:
                countdownTime = c.BEGINNER_TIME;
                break;
        }

        content = (
            <div>
                <TargetSwitcher ranges={ranges} fields={fields} countdownTime={countdownTime}/>
            </div>
        );
    }

    return (content);
}

export default RangeTest;