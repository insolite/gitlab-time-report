import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import TitledValue from './TitledValue';
import TimeProgressBar from './TimeProgressBar';
import MemberTable from '../containers/MemberTable';
import { formatHours } from '../utils';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        props.refresh();
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
                    {this.props.milestones.map((milestone) => <div>{milestone.title}</div>)}
                </div>
                <div className="members">
                    <MemberTable numberWidth="40"/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
