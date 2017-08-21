import React from 'react';


class ProgressBar extends React.Component {
    render() {
        let lines = Array.isArray(this.props.lines) ? this.props.lines : [this.props.lines],
            defaultHeight = 1,
            totalHeight = lines.map(line => line.height || defaultHeight).reduce((a, b) => a + b, 0);
        return (
            <div className={['progress-bar', this.props.className].join(' ')}>
                {lines.map((line, index) =>
                    <div className={['value', line.className].join(' ')}
                         key={index}
                         style={{
                             width: (line.current !== undefined && line.max !== undefined ? 100 * (line.max == 0 ? 1 : line.current / line.max) : line.value) + '%',
                             height: (100 * (line.height || defaultHeight) / totalHeight) + '%'
                         }}
                    ></div>
                )}
            </div>
        );
    }
}

export default ProgressBar;
