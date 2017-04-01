import React from 'react';

import { getHours } from '../utils';
import TimeProgressBar from './TimeProgressBar';


class Issue extends React.Component {
    render() {
        return (
            <div className="issue">
                <div className="link">
                    <a href="#" target="_blank">#{this.props.issue.id}</a>
                </div>
                <div className="title">
                    {this.props.issue.title}
                </div>
                <TimeProgressBar className="progress"
                                 current={this.props.issue.time.total_time_spent}
                                 max={this.props.issue.time.time_estimate}/>
            </div>
        );
    }
}

export default Issue;
