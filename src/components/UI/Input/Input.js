import classes from './Input.module.css';

const input = props => {

    const inputClasses = [classes.InputElement];

    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            <input
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.inputOnChangeHandler}
                type={props.type}
            />
        </div>
    );
};

export default input;