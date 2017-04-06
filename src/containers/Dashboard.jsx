import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';
import { fetchIssues } from '../actions/issue';
import { fetchIssueTime } from '../actions/issueTime';
import { fetchMembers } from '../actions/member';


const mapStateToProps = (state) => {
    let issues = filterIssues(state.issues, state.filters);
    return {
        members: state.members,
        spentHours: sumSpentHours(issues, state.issueTimes),
        estimateHours: sumEstimateHours(issues, state.issueTimes),
        totalCapacity: 130
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchIssues()).then((action) => {
                action.payload.map((issue) => {
                    dispatch(fetchIssueTime(issue.project_id, issue.id));
                });
            });
            dispatch(fetchMembers());
        },
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
