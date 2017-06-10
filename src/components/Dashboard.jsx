import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import TitledValue from './TitledValue';
import ProgressBar from './ProgressBar';
import MemberTable from '../containers/MemberTable';
import { formatHours, flattenObjects } from '../utils';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
        };

        this.refreshClick(props, false);
    }

    refreshClick(props, initIcon=true) {
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
                    <div className="refresh" onClick={() => this.refreshClick(this.props)}>
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

export default Dashboard;
