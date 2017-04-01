import { connect } from 'react-redux';

import Member from '../components/Member';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';
import { toggleExpand } from '../actions/member'


const mapStateToProps = (state, props) => {
    let issues = filterIssues(state.issues, Object.assign({}, state.filters, {member: props.member}));
    return {
        issues: issues,
        spentHours: sumSpentHours(issues),
        estimateHours: sumEstimateHours(issues),
        capacity: props.member.capacity
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpandClick: (id) => {
      dispatch(toggleExpand(id))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
