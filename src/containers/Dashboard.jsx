import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import { filterIssues, sumSpentHours, sumEstimateHours } from '../utils';
import { fetchIssues } from '../actions/issue';
import { fetchIssueTime } from '../actions/issueTime';
import { fetchMembers } from '../actions/member';
import { fetchMilestones } from '../actions/milestone';
import { fetchProjects } from '../actions/project';
import { setProjectFilter, setMilestoneFilter } from '../actions/filters';


const mapStateToProps = (state) => {
    let issues = filterIssues(state.issues, state.filters);
    return {
        members: state.members,
        milestones: state.milestones,
        projects: state.projects,
        filters: state.filters,
        spentHours: sumSpentHours(issues, state.issueTimes),
        estimateHours: sumEstimateHours(issues, state.issueTimes),
        totalCapacity: 130
    }
};

const getValues = (items) => items.map(item => item.value);

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchIssues()).then((action) => {
                action.payload.map((issue) => {
                    dispatch(fetchIssueTime(issue.project_id, issue.id));
                });
            });
            dispatch(fetchMembers());
            dispatch(fetchProjects()).then((action) => {
                action.payload.map((project) => {
                    dispatch(fetchMilestones(project.id));
                });
            });
        },
        filterProjects: (projects) => {
            dispatch(setProjectFilter(getValues(projects)));
        },
        filterMilestones: (milestones) => {
            dispatch(setMilestoneFilter(getValues(milestones)));
        }
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
