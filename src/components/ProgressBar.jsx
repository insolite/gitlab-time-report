import React from 'react';


class ProgressBar extends React.Component {
    render() {
        let lines = Array.isArray(this.props.lines) ? this.props.lines : [this.props.lines],
            defaultHeight = 1,
            totalHeight = lines.map(line => line.height || defaultHeight).reduce((rest, height) => rest + height, 0);
        return (
            <div className={['progress-bar', this.props.className].join(' ')}>
                {lines.map((line) =>
                    <div className={['value', line.className].join(' ')} style={{
                        width: (line.current !== undefined && line.max !== undefined ? 100 * line.current / line.max : line.value) + '%',
                        height: (100 * (line.height || defaultHeight) / totalHeight) + '%'
                    }}></div>
                )}
            </div>
        );
    }
}

export default ProgressBar;
