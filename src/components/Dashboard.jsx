import React from 'react';

import TitledValue from './TitledValue';
import TimeProgressBar from './TimeProgressBar';
import Member from '../containers/Member';
import { formatHours } from '../utils';


class Dashboard extends React.Component {
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
                    <a href="#" className="refresh" onClick={this.props.onRefreshClick}>Refresh</a>
                </div>
                <div className="members">
                    {this.props.members.map((member) =>
                        <Member className="member" member={member}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
