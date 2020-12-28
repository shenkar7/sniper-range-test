import React from 'react';
import classes from './ScopeVision.module.css';
import Draggable from 'react-draggable';
import * as c from '../../../../../utility/constants';
import field0d from '../../../../../media/images/field0d.jpg';
import field0n from '../../../../../media/images/field0n.jpg';
import field0t from '../../../../../media/images/field0t.jpg';
import field1d from '../../../../../media/images/field1d.jpg';
import field1n from '../../../../../media/images/field1n.jpg';
import field1t from '../../../../../media/images/field1t.jpg';
import field2d from '../../../../../media/images/field2d.jpg';
import field2n from '../../../../../media/images/field2n.jpg';
import field2t from '../../../../../media/images/field2t.jpg';
import mildot from '../../../../../media/images/reticles/mil_dot.png';
import tmr from '../../../../../media/images/reticles/tmr.png';
import tremor2 from '../../../../../media/images/reticles/tremor2.png';

const ScopeVision = props => {

    const fields = {
                    field0d: field0d,
                    field0n: field0n,
                    field0t: field0t,
                    field1d: field1d,
                    field1n: field1n,
                    field1t: field1t,
                    field2d: field2d,
                    field2n: field2n,
                    field2t: field2t
                   }
    
    const ZOOM_CONSTANT = 100 / c.MIN_ZOOM;

    const style = {
        height: `${props.zoom * ZOOM_CONSTANT}%`,
        width: `${props.zoom * ZOOM_CONSTANT}%`
    };

    let reticle;
    switch (props.reticle){
        case "mildot":
            reticle = mildot;
            break;
        case "tmr":
            reticle = tmr;
            break;
        case "tremor2":
            reticle = tremor2;
            break;
        default:
            reticle = mildot;
            break;
    }

    // Each ranges img is prepared in the size for the upper field
    // 700m for 500m-700m (field0 to field2)
    // 450m for 350m-450m (field3 to field5)
    // 300m for 200m-300m (field6 to field8)
    let upperRange = c.MEDIUM_RANGE_LIMIT;

    if(props.range > c.MEDIUM_RANGE_LIMIT)
        upperRange = c.MAX_RANGE;
    else if(props.range <= c.CLOSE_RANGE_LIMIT)
        upperRange = c.CLOSE_RANGE_LIMIT;

    const rangeFieldRatio = 100 * upperRange / props.range;

    const fieldStyle = {width: `${rangeFieldRatio}%`, height: `${rangeFieldRatio}%`};
    
    return(
        <div className={classes.ScopeVision}>
            
            <div className={classes.view} style={style}>
                <div className={classes.field} style={fieldStyle}>
                    <Draggable>
                        <div>
                            <img src={fields[props.field]} alt="feild"/>
                        </div>
                    </Draggable>
                </div> 
                <div className={classes.reticle}>
                    <img src={reticle} alt="reticle"></img>
                </div>
            </div>

            <div className={classes.black}></div>
        </div>
    );
}

export default ScopeVision;