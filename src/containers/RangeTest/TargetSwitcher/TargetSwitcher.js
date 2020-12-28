import React, {useState, useCallback, useRef/*, useContext*/} from 'react';
import classes from './TargetSwitcher.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import Countdown from '../../../components/Countdown/Countdown';
import Scope from './Scope/Scope';
import TestStats from '../../../components/TestStats/TestStats';
// import AuthContext from '../../../authContext/authContext';
import * as c from '../../../utility/constants';
import {ButtonLink} from '../../../components/UI/Button/Button';
// import axios from '../../../utility/axios';

const TargetSwitcher = props => {

    const guessedRanges = useRef([]);

    const [round, setRound] = useState(0);
    const [estimatedRange, setEstimatedRange] = useState(c.DEFAULT_RANGE_VAL);
    const [endEstimate, setEndEstimate] = useState(false);
    const [reticle, setReticle] = useState(c.DEFAULT_RETICLE);

    // const authContext = useContext(AuthContext);

    const onReticleChangesHandler = reticle => {
        setReticle(reticle);
    };

    const endCountdownHandler = useCallback(() => {
        setEndEstimate(true)
    }, []);

    const endRoundHandler = () => {
        guessedRanges.current.push(estimatedRange);
        setRound((prevRound) => (prevRound + 1));
        setEndEstimate(false);
        setEstimatedRange(c.DEFAULT_RANGE_VAL);
    };

    let content = endEstimate 
        ?
        <React.Fragment>
            <div className={classes.round}>Round {round+1}/{props.ranges.length}</div>
            <h2 className={classes.realRange}>{props.ranges[round]} m</h2>
            <div className={classes.endDelay}><Countdown time={c.END_ROUND_DELAY_TIME} countdownEnd={endRoundHandler} text=""/></div>
        </React.Fragment>
        :
        <React.Fragment>
            <div className={classes.round}>Round {round+1}/{props.ranges.length}</div>
            <Scope range={props.ranges[round]} field={props.fields[round]} reticle={reticle} onReticleChangesHandler={onReticleChangesHandler}/>
            <Countdown time={props.countdownTime} countdownEnd={endCountdownHandler} text="continue"/>
            <RangeSlider rangeValue={estimatedRange} onChange={range => setEstimatedRange(range)}/>
        </React.Fragment>;

    if(round === props.ranges.length){
        content = 
            <React.Fragment>
                <TestStats ranges={props.ranges} guessedRanges={guessedRanges.current} fields={props.fields}/>
                <br/>
                <ButtonLink action={props.resetTest}>Again</ButtonLink>
                <br/>
                <ButtonLink to='/'>Home</ButtonLink>
            </React.Fragment>;


        // if(authContext.state.token){
        //     // POST game to database
        // }

    }

    return(
        <div className={classes.TargetSwitcher}>
            {content}
        </div>
    );
}

export default TargetSwitcher;