import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ProgressBar from './ProgressBar';
import { formatHours } from '../utils';


const hoursFormatter = (hours) => formatHours(hours, '');

const issueLinkFormatter = (cell, row) => {
    return <a className="link" href={row.web_url} target="_blank">#{cell}</a>;
};

const avatarFormatter = (cell, row) => {
    return <img src={cell} className="avatar"/>;
};

const issueProgressFormatter = (cell, row) => {
    return <ProgressBar lines={{current: row.spentHours, max: row.estimateHours}} className="issue-progress"/>;
};

const stateFormatter = (cell, row) => {
    return <div className={['issue-state', `issue-state-${cell}`].join(' ')}>{cell}</div>;
};

const openCountFormatter = (cell, row) => {
    let colors = {
        0: '#fdddff',
        1: '#d5ffd2',
        2: '#ffe1aa',
        3: '#ffd2d2',
    };
    return <div title={`${cell} open issues`} className='member-state' style={{background: colors[cell] || '#ffa0a0'}}>{cell}</div>;
};

class MemberTable extends React.Component {

    memberProgressFormatter(cell, row) {
        let now = Date.now(),
            minTime = this.props.minTime,
            maxTime = this.props.maxTime;
        return <ProgressBar lines={[
            {height: 10, current: row.spentHours, max: row.capacity},
            {height: 10, current: row.estimateHours, max: row.capacity, className: 'progress-value-second'},
            {height: 2, current: now - minTime, max: maxTime - minTime, className: 'progress-value-third'},
        ]} className="member-progress"/>;
    };

    expandComponent(row) {
        return (
            <BootstrapTable data={row.issues}
                            trClassName="issue">
                <TableHeaderColumn dataField='iid' dataFormat={ issueLinkFormatter } width="45" dataSort isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='title' width="420" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField='state' dataFormat={stateFormatter} width="80" dataSort>State</TableHeaderColumn>
                <TableHeaderColumn dataField='spentHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>Spent</TableHeaderColumn>
                <TableHeaderColumn dataField='estimateHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>Estimate</TableHeaderColumn>
                <TableHeaderColumn dataField='capacity' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>Capacity</TableHeaderColumn>
                <TableHeaderColumn dataField='count' width={this.props.numberWidth} dataSort>Count</TableHeaderColumn>
                <TableHeaderColumn dataFormat={ issueProgressFormatter } width="228">Progress</TableHeaderColumn>
                <TableHeaderColumn dataField='overtime' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>O</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    render() {
        return (
            <div key={Date.now()}> {/* Because `expanding` option change does not affect DOM without rerender */}
                <BootstrapTable data={this.props.data}
                                trClassName="member"
                                expandComponent={ (row) => this.expandComponent(row) }
                                expandableRow={() => true}
                                options={{expanding: this.props.data.map((member) => member.name)}}
                                search>
                    <TableHeaderColumn dataField='avatar_url' dataFormat={ avatarFormatter } width="35"></TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width="430" dataSort isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='openCount' dataFormat={openCountFormatter} width="80" dataSort>L</TableHeaderColumn>
                    <TableHeaderColumn dataField='spentHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>S</TableHeaderColumn>
                    <TableHeaderColumn dataField='estimateHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>E</TableHeaderColumn>
                    <TableHeaderColumn dataField='capacity' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>C</TableHeaderColumn>
                    <TableHeaderColumn dataField='count' width={this.props.numberWidth} dataSort>N</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell, row) => this.memberProgressFormatter(cell, row)} width="228">Progress</TableHeaderColumn>
                    <TableHeaderColumn dataField='overtime' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>O</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default MemberTable;
