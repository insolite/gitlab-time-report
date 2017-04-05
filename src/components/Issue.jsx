import React from 'react';

import TimeProgressBar from './TimeProgressBar';
import { formatHours } from '../utils';


class Issue extends React.Component {
    render() {
        return (
            <div className="issue">
                <div className="link">
                    <a href={this.props.issue.web_url} target="_blank">#{this.props.issue.id}</a>
                </div>
                <div className="title">{this.props.issue.title}</div>
                <div className="spentHours">{formatHours(this.props.spentHours)}</div>
                <div className="estimateHours">{formatHours(this.props.estimateHours)}</div>
                <div className="capacity">{formatHours(this.props.capacity)}</div>
                <TimeProgressBar className="progress"
                                 current={this.props.spentHours}
                                 max={this.props.estimateHours}/>
            </div>
        );
    }
}

export default Issue;
