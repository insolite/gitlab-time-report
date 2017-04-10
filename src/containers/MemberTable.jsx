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
                        spentHours: spent,
                        estimateHours: estimate,
                        overtime: spent > estimate ? spent - estimate : 0
                    });
                }
            ),
            spentHours: spent,
            estimateHours: estimate,
            capacity: member.capacity,
            count: memberIssues.length,
            overtime: spent > estimate ? spent - estimate : 0
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
