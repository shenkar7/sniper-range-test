import classes from './Button.module.css';
import {Link} from 'react-router-dom';

export const Button = props => {
    
    return (
        <div className={classes.Button}>
            <button onClick={props.clicked}>{props.children}</button>
        </div>
    );    
}

export const ButtonLink = props => {
    let link = null;
    if(props.to)
        link = <Link className={classes.ButtonLink} to={props.to} replace={!props.replace}>{props.children}</Link>;
    else if(props.action)
        link = <span className={classes.ButtonLink} onClick={props.action}>{props.children}</span>;

    return <div>{link}</div>;
}

export const ButtonSmallLink = props => {
    let link;
    if(props.to){
        link = <Link className={classes.smallLink} to={props.to}>{props.children}</Link>
    }
    else{
        link = <span className={classes.smallLink} onClick={props.click}>{props.children}</span> 
    }

    return link;
}