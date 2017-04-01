import React from 'react';


class Expander extends React.Component {
    render() {
        return (
            <div className="expander" onClick={this.props.onClick}>{this.props.expanded ? '-' : '+'}</div>
        );
    }
}

export default Expander;
