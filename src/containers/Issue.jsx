import { connect } from 'react-redux';

import { sumSpentHours, sumEstimateHours } from '../utils';
import Issue from '../components/Issue';


const mapStateToProps = (state, props) => {
    // let issueTime = state.issueTimes[props.issue.id];
    return {
        issue: props.issue,
        // time: issueTime,
        spentHours: sumSpentHours([props.issue], state.issueTimes),
        estimateHours: sumEstimateHours([props.issue], state.issueTimes),
        // time: {},
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue);
