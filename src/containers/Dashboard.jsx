import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';


const mapStateToProps = (state) => {
    let issues = filterIssues(state.issues, state.filters);
    return {
        issues: issues,
        members: state.members,
        spentHours: sumSpentHours(issues),
        estimateHours: sumEstimateHours(issues),
        totalCapacity: 130
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onTodoClick: (id) => {
    //   dispatch(toggleTodo(id))
    // }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
