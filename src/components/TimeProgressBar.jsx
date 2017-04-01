import React from 'react';

import ProgressBar from './ProgressBar';


class TimeProgressBar extends React.Component {
    render() {
        return (
            <ProgressBar className={this.props.className} value={100 * this.props.current / this.props.max}/>
        );
    }
}

export default TimeProgressBar;
