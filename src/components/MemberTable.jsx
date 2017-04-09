import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ProgressBar from './ProgressBar';
import { formatHours } from '../utils';


const hoursFormatter = (hours) => formatHours(hours, '');

const issueLinkFormatter = (cell, row) => {
    return <a className="link" href={row.web_url} target="_blank">#{cell}</a>;
};

const avatarFormatter = (cell, row) => {
    return <img src={row.avatar_url} className="avatar"/>;
};

const memberProgressFormatter = (cell, row) => {
    let now = Date.now(),
        min = new Date('2017-04-05T00:00:00').getTime(),
        max = new Date('2017-04-12T00:00:00').getTime(); // FIXME: from props
    return <ProgressBar lines={[
        {height: 10, current: row.spentHours, max: row.capacity},
        {height: 10, current: row.estimateHours, max: row.capacity, className: 'progress-value-second'},
        {height: 2, current: now - min, max: max - min, className: 'progress-value-third'},
    ]} className="member-progress"/>;
};

const issueProgressFormatter = (cell, row) => {
    return <ProgressBar lines={{current: row.spentHours, max: row.estimateHours}} className="issue-progress"/>;
};

class MemberTable extends React.Component {

    expandComponent(row) {
        return (
            <BootstrapTable data={row.issues}
                            trClassName="issue">
                <TableHeaderColumn dataField='id' dataFormat={ issueLinkFormatter } isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='title' width="556">Title</TableHeaderColumn>
                <TableHeaderColumn dataField='spentHours' dataFormat={hoursFormatter} width={this.props.numberWidth}>Spent</TableHeaderColumn>
                <TableHeaderColumn dataField='estimateHours' dataFormat={hoursFormatter} width={this.props.numberWidth}>Estimate</TableHeaderColumn>
                <TableHeaderColumn dataField='capacity' dataFormat={hoursFormatter} width={this.props.numberWidth}>Capacity</TableHeaderColumn>
                <TableHeaderColumn dataField='count' width={this.props.numberWidth}>Count</TableHeaderColumn>
                <TableHeaderColumn dataFormat={ issueProgressFormatter }>Progress</TableHeaderColumn>
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
                    <TableHeaderColumn dataFormat={ avatarFormatter } width="35">I</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width="569" dataSort isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='spentHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>S</TableHeaderColumn>
                    <TableHeaderColumn dataField='estimateHours' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>E</TableHeaderColumn>
                    <TableHeaderColumn dataField='capacity' dataFormat={hoursFormatter} width={this.props.numberWidth} dataSort>C</TableHeaderColumn>
                    <TableHeaderColumn dataField='count' width={this.props.numberWidth} dataSort>N</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={ memberProgressFormatter }>Progress</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default MemberTable;
