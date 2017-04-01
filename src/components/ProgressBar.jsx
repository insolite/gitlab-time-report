import React from 'react';


class ProgressBar extends React.Component {
    render() {
        return (
            <div className={['progress-bar', this.props.className].join(' ')}>
                <div className="value" style={{'width': this.props.value + '%'}}></div>
            </div>
        );
    }
}

export default ProgressBar;
