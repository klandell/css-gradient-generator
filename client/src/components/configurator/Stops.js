import React from 'react';
import PropTypes from 'prop-types';

export default class Stops extends React.Component {
    static PropTypes = {
        stops: PropTypes.array.isRequired,
        onStopClick: PropTypes.func.isRequired,
        selectedStop: PropTypes.number.isRequired,
    }

    convertColors(colors) {
        return `rgba(${colors.red}, ${colors.green}, ${colors.blue}, 1)`;
    }

    renderStops() {
        return this.props.stops.map(this.renderStop, this);
    }

    renderStop(stop, i) {
        const { selectedStop, onStopClick } = this.props;
        const style = {
            backgroundColor: this.convertColors(stop),
        };
        let selectedCls;

        if (selectedStop === i) {
            selectedCls = 'stop-selected';
        }
        return (
            <div key={i} data-key={i} onClick={onStopClick}>
                <div>Stop {i}</div>
                <div className={`color-preview ${selectedCls}`} style={style} />
            </div>
        );
    }

    render() {
        const renderedStops = this.renderStops();

        return (
            <div className="stops">
                {renderedStops}
            </div>
        );
    }
}
