import React, {useState} from 'react';
import classes from './Scope.module.css';
import ScopeVision from './ScopeVision/ScopeVision';
import ZoomSlider from './ZoomSlider/ZoomSlider';
import * as c from '../../../../utility/constants';

const Scope = React.memo(props => {

    const [zoom, setZoom] = useState(c.DEFAULT_ZOOM);
    
    const onZoomChangeHandler = zoom => {
        setZoom(zoom);
    };

    const onReticleChangesHandler = event => {
        props.onReticleChangesHandler(event.target.value);
    };

    const reticleInput = 
        <div className={classes.reticleInput}>
            <div className={classes.singleInput}>
                <input type="radio"
                    id="mildot"
                    name="reticle"
                    value="mildot"
                    checked={props.reticle === "mildot"}
                    onChange={onReticleChangesHandler}
                />
                <label htmlFor="mildot">Mil Dot</label>
            </div>
            <div className={classes.singleInput}>
                <input
                    type="radio"
                    id="tmr"
                    name="reticle"
                    value="tmr"
                    checked={props.reticle === "tmr"}
                    onChange={onReticleChangesHandler}
                />
                <label htmlFor="tmr">TMR</label>
            </div>
            <div className={classes.singleInput}>
                <input
                    type="radio"
                    id="tremor2"
                    name="reticle"
                    value="tremor2"
                    checked={props.reticle === "tremor2"}
                    onChange={onReticleChangesHandler}
                />
                <label htmlFor="tremor2">Tremor2</label>
            </div>
        </div>;

    return(
        <div className={classes.Scope}>
            <div className={classes.sides}>
                {reticleInput}
            </div>
            <div className={classes.ScopeVision}>
                <div className={classes.mobileAdj}>
                    <ScopeVision zoom={zoom} range={props.range} field={props.field} reticle={props.reticle}/>
                </div>
            </div>
            <div className={classes.sides}>
                <ZoomSlider zoom={zoom} onZoomChangeHandler={onZoomChangeHandler}/>
            </div>
        </div>
    );
});

export default Scope;