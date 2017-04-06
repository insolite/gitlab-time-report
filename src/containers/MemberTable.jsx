import { connect } from 'react-redux';

import MemberTable from '../components/MemberTable';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';


const mapStateToProps = (state, props) => {
    let issues = filterIssues(state.issues, state.filters),
        data,
        members = {};
    state.members.map((member) => {
        let memberIssues = filterIssues(issues, {member: member});
        members[member.id] = Object.assign({}, member, {
            issues: memberIssues.map((issue) => Object.assign({}, issue, {
                spentHours: sumSpentHours([issue], state.issueTimes),
                estimateHours: sumEstimateHours([issue], state.issueTimes),
            })),
            spentHours: sumSpentHours(memberIssues, state.issueTimes),
            estimateHours: sumEstimateHours(memberIssues, state.issueTimes),
            count: memberIssues.length,
            capacity: 30
        });
    });
    data = Object.values(members);
    return {
        data: data,
        spentHours: sumSpentHours(issues, state.issueTimes),
        estimateHours: sumEstimateHours(issues, state.issueTimes),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberTable);
