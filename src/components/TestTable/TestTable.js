import { useMediaQuery } from 'react-responsive';
import classes from './TestTable.module.css';

const TestTable = props => {

    const renderHeader = (start, end) => {
        const headerContent = ["Round"];
        for(let i=start; i < end; i++){
            headerContent.push(i+1);
        }

        return (
            headerContent.map((key, index) => {
                return <th key={index}>{key}</th>
            })
        );
    };

    const renderRanges = (start, end) => {
        const rangesContent = ["Range"];
        for(let i=start; i < end; i++){
            rangesContent.push(props.ranges[i]);
        }

        return(
            rangesContent.map((key, index) => {
                return <td key={index}>{key}</td>
            })
        );
    };

    const renderVisions = (start, end) => {
        const visionsContent = ["Vision"];
        for(let i=start; i < end; i++){
            const visionType =  props.vision[i].substring(props.vision[i].length - 1);
            switch (visionType){
                case "d":
                    visionsContent.push("Day");
                    break;
                case "n":
                    visionsContent.push("Night");
                    break;
                case "t":
                    visionsContent.push("Thermal");
                    break;
                default:
                    visionsContent.push("None");
            }
        }

        return(
            visionsContent.map((key, index) => {
                return <td key={index}>{key}</td>
            })
        );
    };

    const renderGuessed = (start, end) => {
        const guessedContent = ["Guessed Range"];
        for(let i=start; i < end; i++){
            guessedContent.push(props.guessedRanges[i]);
        }

        return (
            guessedContent.map((key, index) => {
                if(index > 0){
                    const diff = Math.abs(props.ranges[start + index-1] - props.guessedRanges[start + index-1]);
                    switch (true){
                        case diff === 0:
                            return <td key={index} className={classes.good}>{key}</td>
                        case diff === 50:
                            return <td key={index} className={classes.medium}>{key}</td>
                        case diff > 50:
                            return <td key={index} className={classes.bad}>{key}</td>
                        default:
                            return <td key={index}>{key}</td>
                    }
                }

                else
                    return <td key={index} >{key}</td>
            })
        );
    };

    const isMobile = useMediaQuery({
        query: '(max-width: 750px)'
    });

    let content = null;

    if(isMobile){
        content = (
            <table id='Test' className={classes.Table}>
                <thead>
                    <tr>{renderHeader(0, 5)}</tr>
                </thead>
                <tbody>
                    <tr key="ranges">{renderRanges(0, 5)}</tr>
                    <tr key="visions">{renderVisions(0, 5)}</tr>
                    <tr key="guessed">{renderGuessed(0, 5)}</tr>
                    <tr>{renderHeader(5, props.ranges.length)}</tr>
                    <tr key="ranges2">{renderRanges(5, props.ranges.length)}</tr>
                    <tr key="visions2">{renderVisions(5, props.ranges.length)}</tr>
                    <tr key="guessed2">{renderGuessed(5, props.ranges.length)}</tr>
                </tbody>
            </table>
        );
    }
    else{
        content = (
            <table id='Test' className={classes.Table}>
                <thead>
                    <tr>{renderHeader(0, props.ranges.length)}</tr>
                </thead>
                <tbody>
                    <tr key="ranges">{renderRanges(0, props.ranges.length)}</tr>
                    <tr key="visions">{renderVisions(0, props.ranges.length)}</tr>
                    <tr key="guessed">{renderGuessed(0, props.ranges.length)}</tr>
                </tbody>
            </table>
        );
    }

    return content;
}

export default TestTable;