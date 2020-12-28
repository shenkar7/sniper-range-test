import React from 'react';
import classes from './RangeSlider.module.css';
import * as c from '../../../../utility/constants';

const RangeSlider = (props) => {

  const onChangeHandler = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className={classes.RangeSlider}>
      <h2>{props.rangeValue} m</h2>
      <input type="range" min={c.MIN_RANGE} max={c.MAX_RANGE} value={props.rangeValue} step={c.RANGES_STEPS} onChange={(event => onChangeHandler(event))}/>
      <div className={classes.ticks}>
        <span className={classes.tick}>200</span>
        <span className={classes.tick}>450</span>
        <span className={classes.tick}>700</span>
      </div>
    </div>
  );
};

export default RangeSlider;