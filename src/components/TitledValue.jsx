import React from 'react';


class TitledValue extends React.Component {
    render() {
        return (
            <div className="titled-value">
                <div className="title">
                    {this.props.title}
                </div>
                <div className={['value', this.props.max && this.props.value > this.props.max ? 'overflow' : 'normal'].join(' ')}>
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default TitledValue;
