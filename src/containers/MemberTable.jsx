import { connect } from 'react-redux';

import MemberTable from '../components/MemberTable';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';


const mapStateToProps = (state, props) => {
    let data,
        members = {};
    props.members.map((member) => {
        let memberIssues = filterIssues(props.issues, {members: [member.id]}),
            spent = sumSpentHours(memberIssues, state.issueTimes),
            estimate = sumEstimateHours(memberIssues, state.issueTimes);
        members[member.id] = Object.assign({}, member, {
            issues: memberIssues.map((issue) => {
                    let spent = sumSpentHours([issue], state.issueTimes),
                        estimate = sumEstimateHours([issue], state.issueTimes);
                    return Object.assign({}, issue, {
                        state: issue.state,
                        spentHours: spent,
                        estimateHours: estimate,
                        overtime: Math.max(spent - estimate, 0)
                    });
                }
            ),
            spentHours: spent,
            estimateHours: estimate,
            capacity: member.capacity,
            count: memberIssues.length,
            openCount: memberIssues.filter((issue) => issue.state != 'closed').length,
            overtime: memberIssues
                .map((issue) => Math.max(sumSpentHours([issue], state.issueTimes) - sumEstimateHours([issue], state.issueTimes), 0))
                .reduce((a, b) => a + b, 0)
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
