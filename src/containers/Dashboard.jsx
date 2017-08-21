import React from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import { filterIssues, sumSpentHours, sumEstimateHours, flattenObjects, formatHours } from '../utils';
import { fetchIssues } from '../actions/issue';
import { fetchIssueTime } from '../actions/issueTime';
import { fetchMembers } from '../actions/member';
import { fetchMilestones } from '../actions/milestone';
import { fetchProjects } from '../actions/project';
import { setFilters } from '../actions/filters';
import TitledValue from '../components/TitledValue';
import ProgressBar from '../components/ProgressBar';
import MemberTable from './MemberTable';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
        };

        this.refresh(props, false);
    }

    refresh(props, initIcon=true) {
        if (initIcon) {
            this.setState({
                refreshing: true
            });
        }
        let promises = props.refresh();
        Promise.all(promises).then(() => this.setState({
            refreshing: false
        }));
    }

    getProjectOptions() {
        return this.props.projects.map((project) => {return {value: project.id, label: project.name}});
    }

    getMilestoneOptions() {
        return (
            flattenObjects(this.props.milestones)
            .filter(milestone => (
                !this.props.filters ||
                !(this.props.filters.projects || []).length ||
                (this.props.filters.projects || []).indexOf(milestone.project_id) >= 0))
            .map((milestone) => {
                let projectName = this.props.projects.filter((project) => project.id == milestone.project_id)[0].name;
                return {value: milestone.id, label: `${projectName} - ${milestone.title}`}
            })
        );
    }

    getMemberOptions() {
        return this.props.allMembers.map((member) => {return {value: member.id, label: member.name}});
    }

    getEdgeDate(key, func) {
        return func(...
            flattenObjects(this.props.milestones)
            .filter(milestone => (
                !this.props.filters ||
                !(this.props.filters.milestones || []).length ||
                (this.props.filters.milestones || []).indexOf(milestone.id) >= 0))
            .map((milestone) => new Date(milestone[key]).getTime())
        );
    }

    getStartDate() {
        return this.getEdgeDate('start_date', Math.min);
    }

    getDueDate() {
        return this.getEdgeDate('due_date', Math.max);
    }

    render() {
        let now = Date.now(),
            minTime = this.getStartDate(),
            maxTime = this.getDueDate();
        return (
            <div className="dashboard">
                <div className="total">
                    <TitledValue title="Total Spent" value={formatHours(this.props.spentHours)}/>
                    <TitledValue title="Total Estimate" value={formatHours(this.props.estimateHours)} max={this.props.totalCapacity}/>
                    <TitledValue title="Total Capacity" value={formatHours(this.props.totalCapacity)}/>
                    <ProgressBar lines={[
                        {height: 10, current: this.props.spentHours, max: this.props.totalCapacity},
                        {height: 10, current: this.props.estimateHours, max: this.props.totalCapacity, className: 'progress-value-second'},
                        {height: 2, current: now - minTime, max: maxTime - minTime, className: 'progress-value-third'},
                    ]} className="big-progress"/>
                    <div className="refresh" onClick={() => this.refresh(this.props)}>
                        <img className={['refresh-icon', this.state.refreshing ? 'refreshing' : ''].join(' ')} src="/resources/image/refresh.svg"/>
                    </div>
                </div>
                <div className="toolbar">
                    Projects
                    <Select
                      value={this.props.filters.projects}
                      options={this.getProjectOptions()}
                      multi={true}
                      onChange={this.props.filterProjects}
                    />
                    Milestones
                    <Select
                      value={this.props.filters.milestones}
                      options={this.getMilestoneOptions()}
                      multi={true}
                      onChange={this.props.filterMilestones}
                    />
                    Members
                    <Select
                      value={this.props.filters.members}
                      options={this.getMemberOptions()}
                      multi={true}
                      onChange={this.props.filterMembers}
                    />
                </div>
                <div className="members">
                    <MemberTable numberWidth="50" members={this.props.members} issues={this.props.issues} minTime={minTime} maxTime={maxTime}/>
                </div>
            </div>
        );
    }
}

const getFilters = items => {
    let filters = {};
    Object.entries(items).map((keyval) => {
        let key = keyval[0],
            val = keyval[1];
        filters[key] = (val || []).length ? val.map(item => item.value) : undefined;
    });
    return filters;
};

export default connect(
    (state) => {
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
    },
    (dispatch) => {
        return {
            refresh: (projectIds) => {
                let members = dispatch(fetchMembers()),
                    projects = dispatch(fetchProjects());
                projects.then((action) => {
                    action.payload.map((project) => {
                        if (!projectIds || projectIds.indexOf(project.id) >= 0) {
                            dispatch(fetchIssues(project.id)).then((action) => {
                                action.payload.map((issue) => {
                                    dispatch(fetchIssueTime(issue.project_id, issue.iid));
                                });
                            });
                            dispatch(fetchMilestones(project.id));
                        }
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
    },
)(Dashboard);
