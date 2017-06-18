import React from 'react';
import PropTypes from 'prop-types';

export default class DirectionForm extends React.Component {
    static propTypes = {
        gradientType: PropTypes.string.isRequired,
        onGradientTypeSelect: PropTypes.func.isRequired,
        gradientDirection: PropTypes.string.isRequired,
        onGradientDirectionSelect: PropTypes.func.isRequired,
        onHexChange: PropTypes.func.isRequired,
        hex: PropTypes.string.isRequired,
    }

    /**
     * When the hex value changes, try to convert the hex to a valid rgb value
     */
    onHexChange(e) {
        const { onHexChange } = this.props;
        const rgb = this.hexToRgb(e.currentTarget.value);

        onHexChange(rgb || e);
    }

    /**
     * Return the options for the direction select field that are valid
     * for all gradient types
     */
    getDefaultOptions() {
        return {
            top: 'Top',
            topRight: 'Top Right',
            right: 'Right',
            bottomRight: 'Bottom Right',
            bottom: 'Bottom',
            bottomLeft: 'Bottom Left',
            left: 'Left',
            topLeft: 'Top Left',
        };
    }

    /**
     * Convert a hex value to it's rgb equivalent.  For simplicity, we are
     * not allowing hex triplets.
     */
    hexToRgb(hex) {
        const result = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ] : null;
    }

    /**
     * Render the direction options, if we select radial, we need to add another
     * option for center to the dropdown
     */
    renderDirectionOptions() {
        const defaultOptions = this.getDefaultOptions();
        const options = Object.keys(defaultOptions).map(o => <option value={o} key={o}>{defaultOptions[o]}</option>);

        if (this.props.gradientType === 'radial') {
            options.unshift(<option value="center" key="center">Center</option>);
        }
        return options;
    }

    render() {
        const { gradientType, onGradientTypeSelect, gradientDirection, onGradientDirectionSelect, hex } = this.props;
        const directionOptions = this.renderDirectionOptions();

        return (
            <form className="direction-form">
                <div className="hex-wrapper">
                    <label htmlFor="hex">Hex</label>
                    <input type="text" name="hex" value={hex} onChange={e => this.onHexChange(e)} maxLength="7" />
                </div>
                <div>
                    <label htmlFor="style">Style</label>
                    <select name="style" value={gradientType} onChange={onGradientTypeSelect}>
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="direction">Direction</label>
                    <select name="direction" value={gradientDirection} onChange={onGradientDirectionSelect}>
                        {directionOptions}
                    </select>
                </div>
            </form>
        );
    }
}
