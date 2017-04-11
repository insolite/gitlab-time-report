import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import { filterIssues, sumSpentHours, sumEstimateHours, flattenObjects } from '../utils';
import { fetchIssues } from '../actions/issue';
import { fetchIssueTime } from '../actions/issueTime';
import { fetchMembers } from '../actions/member';
import { fetchMilestones } from '../actions/milestone';
import { fetchProjects } from '../actions/project';
import { setFilters } from '../actions/filters';


const mapStateToProps = (state) => {
    let issues = filterIssues(flattenObjects(state.issues), state.filters),
        allMembers = state.members,
        members = allMembers.filter(member => !state.filters || !(state.filters.members || []).length || state.filters.members.indexOf(member.id) >= 0);
    return {
        issues,
        allMembers,
        members,
        milestones: state.milestones,
        projects: state.projects,
        filters: state.filters,
        spentHours: sumSpentHours(issues, state.issueTimes),
        estimateHours: sumEstimateHours(issues, state.issueTimes),
        totalCapacity: members.map(member => member.capacity).reduce((a, b) => a + b, 0)
    }
};

const getFilters = items => {
    let filters = {};
    Object.entries(items).map((keyval) => {
        let key = keyval[0],
            val = keyval[1];
        filters[key] = (val || []).length ? val.map(item => item.value) : undefined;
    });
    return filters;
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            let members = dispatch(fetchMembers()),
                projects = dispatch(fetchProjects());
            projects.then((action) => {
                action.payload.map((project) => {
                    dispatch(fetchIssues(project.id)).then((action) => {
                        action.payload.map((issue) => {
                            dispatch(fetchIssueTime(issue.project_id, issue.iid));
                        });
                    });
                    dispatch(fetchMilestones(project.id));
                });
            });
            return [members, projects]; // TODO: add inner promises (issue time, milestones) somehow
        },
        filterProjects: (projects) => {
            dispatch(setFilters(getFilters({projects})));
        },
        filterMilestones: (milestones) => {
            dispatch(setFilters(getFilters({milestones})));
        },
        filterMembers: (members) => {
            dispatch(setFilters(getFilters({members})));
        }
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
