import { connect } from 'react-redux';

import Member from '../components/Member';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';


const mapStateToProps = (state, props) => {
    let issues = filterIssues(state.issues, Object.assign({}, state.filters, {member: props.member}));
    return {
        issues: issues,
        spentHours: sumSpentHours(issues, state.issueTimes),
        estimateHours: sumEstimateHours(issues, state.issueTimes),
        capacity: props.member.capacity || 30
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
