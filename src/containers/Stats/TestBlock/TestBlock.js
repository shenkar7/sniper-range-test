import React, {useState} from 'react';
import TestTable from '../../../components/TestTable/TestTable';
import classes from './TestBlock.module.css';
import {calculateScore} from '../../../utility/utility';

const TestBlock = props => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpenHandler = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }

    const finalScore = calculateScore(props.ranges, props.guessedRanges) ;
    const tr = <React.Fragment>
                    {props.date}<span className={classes.score}>{finalScore}/100</span>
               </React.Fragment>
    return(
        <React.Fragment>
            <div>
                <table id={props.date} className={classes.TableTop} onClick={toggleIsOpenHandler}>
                    <thead>
                        <tr>
                            <td>
                                {props.date}<span className={classes.score}>{finalScore}/100</span>
                            </td>
                        </tr> 
                    </thead>
                </table>
            </div>
                {isOpen
                    ? <TestTable ranges={props.ranges} vision={props.fields} guessedRanges={props.guessedRanges}/>
                    : null
                }    
        </React.Fragment>
    );
}

export default TestBlock;
