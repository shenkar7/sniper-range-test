import React from 'react';
import { useMediaQuery } from 'react-responsive';
import classes from './ZoomSlider.module.css';
import * as c from '../../../../../utility/constants';

const ZoomSlider = props => {

    const isMobile = useMediaQuery({
        query: '(max-width: 750px)'
    });

    let p = <p>×{props.zoom}</p>
    if(isMobile){
        p = <p style={{"left": `${props.zoom*3.53 - 42}%`}}>×{props.zoom}</p>
    }

    return(
        <div className={classes.ZoomSlider}>
            {p}
            <input type="range" min={c.MIN_ZOOM} max={c.MAX_ZOOM} value={props.zoom} onChange={event => props.onZoomChangeHandler(event.target.value)}/>
            <output className="bubble"></output>
        </div>
    );
}

export default ZoomSlider;