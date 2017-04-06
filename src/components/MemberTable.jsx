import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import TimeProgressBar from './TimeProgressBar';


const issueLinkFormatter = (cell, row) => {
    return <a className="link" href={row.web_url} target="_blank">#{cell}</a>;
};

const avatarFormatter = (cell, row) => {
    return <img src={row.avatar_url} className="avatar"/>;
};

const memberProgressFormatter = (cell, row) => {
    return <TimeProgressBar current={row.spentHours} max={row.capacity} className="member-progress"/>;
};

const issueProgressFormatter = (cell, row) => {
    return <TimeProgressBar current={row.spentHours} max={row.estimateHours} className="issue-progress"/>;
};

class MemberTable extends React.Component {

    expandComponent(row) {
        return (
            <BootstrapTable data={row.issues}
                            trClassName="issue">
                <TableHeaderColumn dataField='id' dataFormat={ issueLinkFormatter } isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='title' width="374">Title</TableHeaderColumn>
                <TableHeaderColumn dataField='spentHours' width={this.props.numberWidth}>Spent</TableHeaderColumn>
                <TableHeaderColumn dataField='estimateHours' width={this.props.numberWidth}>Estimate</TableHeaderColumn>
                <TableHeaderColumn dataField='capacity' width={this.props.numberWidth}>Capacity</TableHeaderColumn>
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
                    <TableHeaderColumn dataFormat={ avatarFormatter }>Img</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width="400" isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='spentHours' width={this.props.numberWidth}>Spent</TableHeaderColumn>
                    <TableHeaderColumn dataField='estimateHours' width={this.props.numberWidth}>Estimate</TableHeaderColumn>
                    <TableHeaderColumn dataField='capacity' width={this.props.numberWidth}>Capacity</TableHeaderColumn>
                    <TableHeaderColumn dataField='count' width={this.props.numberWidth}>Count</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={ memberProgressFormatter }>Progress</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default MemberTable;
