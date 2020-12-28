import {calculateScore, filterRangesByVision} from '../../utility/utility';

// import * as c from '../../utility/constants';

const TestStats = props => {

        const finalScore = calculateScore(props.ranges, props.guessedRanges);

        const dayScore = calculateScore(
                filterRangesByVision(props.ranges, props.fields, "d"), 
                filterRangesByVision(props.guessedRanges, props.fields, "d"),
        );

        const nightScore = calculateScore(
                filterRangesByVision(props.ranges, props.fields, "n"), 
                filterRangesByVision(props.guessedRanges, props.fields, "n"),
        );

        const thermalScore = calculateScore(
                filterRangesByVision(props.ranges, props.fields, "t"), 
                filterRangesByVision(props.guessedRanges, props.fields, "t"),
        );

        return(
                <div>
                        <h2>Your Score Is:</h2>
                        <h2>{finalScore}/100</h2>
                        <div>
                                <p>Day Score: {dayScore}%</p>
                                <p>Night Score: {nightScore}%</p>
                                <p>Thermal Score: {thermalScore}%</p>
                        </div>
                </div>
        );
}

export default TestStats;