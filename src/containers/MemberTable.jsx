import { connect } from 'react-redux';

import MemberTable from '../components/MemberTable';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';


const mapStateToProps = (state, props) => {
    let data,
        members = {};
    props.members.map((member) => {
        let memberIssues = filterIssues(props.issues, {members: [member.id]});
        members[member.id] = Object.assign({}, member, {
            issues: memberIssues.map((issue) => Object.assign({}, issue, {
                spentHours: sumSpentHours([issue], state.issueTimes),
                estimateHours: sumEstimateHours([issue], state.issueTimes),
            })),
            spentHours: sumSpentHours(memberIssues, state.issueTimes),
            estimateHours: sumEstimateHours(memberIssues, state.issueTimes),
            count: memberIssues.length,
            capacity: member.capacity
        });
    });
    data = Object.values(members);
    return {
        data: data,
        spentHours: sumSpentHours(props.issues, state.issueTimes),
        estimateHours: sumEstimateHours(props.issues, state.issueTimes),
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
