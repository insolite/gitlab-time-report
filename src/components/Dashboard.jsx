import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import TitledValue from './TitledValue';
import TimeProgressBar from './TimeProgressBar';
import MemberTable from '../containers/MemberTable';
import { formatHours } from '../utils';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        props.refresh();
    }

    getProjectOptions() {
        return this.props.projects.map((project) => {return {value: project.id, label: project.name}});
    }

    getMilestoneOptions() {
        return [].concat.apply([], Object.values(this.props.milestones).map((milestones) =>
            milestones
            .filter(milestone => (
                !this.props.filters ||
                !(this.props.filters.projects || []).length ||
                (this.props.filters.projects || []).indexOf(milestone.project_id) >= 0))
            .map((milestone) => {
                let projectName = this.props.projects.filter((project) => project.id == milestone.project_id)[0].name;
                return {value: milestone.id, label: `${projectName} - ${milestone.title}`}
            })
        ));
    }

    render() {
        return (
            <div className="dashboard">
                <div className="total">
                    <TitledValue title="Total Hours" value={formatHours(this.props.spentHours)}/>
                    <TitledValue title="Total Estimate" value={formatHours(this.props.estimateHours)} max={this.props.totalCapacity}/>
                    <TitledValue title="Total Capacity" value={formatHours(this.props.totalCapacity)}/>
                    <TimeProgressBar current={this.props.spentHours} max={this.props.totalCapacity} className="big-progress"/>
                </div>
                <div className="toolbar">
                    <a href="#" className="refresh" onClick={this.props.refresh}>Refresh</a>
                    <br/>
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
                </div>
                <div className="members">
                    <MemberTable numberWidth="40"/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
