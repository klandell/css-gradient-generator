import React from 'react';
import PropTypes from 'prop-types';
require('Sass/components/Preview.scss');

export default class Preview extends React.Component {
    static PropTypes = {
        configuratorState: PropTypes.shape({
            stops: PropTypes.array.isRequired,
            gradientType: PropTypes.string.isRequired,
            gradientDirection: PropTypes.string.isRequired,
        }).isRequired,
    }

    /**
     * Converts an RGB value to it's hex equivalent
     */
    rgbToHex(red, green, blue) {
        return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
    }

    /**
     * Converts the values of the directions that are listed in the select box to
     * thier valid css equivalents
     */
    getRealDirection(gradientDirection, type) {
        const legacyDirections = {
            center: 'center',
            top: 'top',
            topRight: 'top right',
            right: 'right',
            bottomRight: 'bottom right',
            bottom: 'bottom',
            bottomLeft: 'bottom left',
            left: 'left',
            topLeft: 'top left',
        };
        const standardRadialDirections = {
            center: 'ellipse at center',
            top: 'at top',
            topRight: 'at top right',
            right: 'at right',
            bottomRight: 'at bottom right',
            bottom: 'at bottom',
            bottomLeft: 'at bottom left',
            left: 'at left',
            topLeft: 'at top left',
        };
        const standardLinearDirections = {
            center: 'ellipse at center',
            top: 'to bottom',
            topRight: 'to bottom left',
            right: 'to left',
            bottomRight: 'to top left',
            bottom: 'to top',
            bottomLeft: 'to top right',
            left: 'to right',
            topLeft: 'to bottom right',
        };

        const legacyDirection = legacyDirections[gradientDirection];
        const standardDirection = type === 'linear' ? standardLinearDirections[gradientDirection] : standardRadialDirections[gradientDirection];

        return { legacyDirection, standardDirection };
    }

    /**
     * Add any required browser prefixes to our css strings
     */
    getPrefix(browserType) {
        return {
            legacy: '',
            webkit: '-webkit-',
            opera: '-o-',
            mozilla: '-moz-',
            standard: '',
        }[browserType];
    }

    /**
     * Builds a css gradient string for a given browser type
     */
    getCSS(browserType, gradientType, direction, hexStart, hexEnd) {
        if (browserType === 'legacy') {
            return `${hexStart};`;
        }
        return `${this.getPrefix(browserType)}${gradientType}-gradient(${direction}, ${hexStart}, ${hexEnd});`;
    }

    /**
     * Builds an object of gradients keyed by browser type
     */
    buildStyle() {
        const { stops, gradientType, gradientDirection } = this.props;
        const [stop0, stop1] = stops;
        const hexStart = this.rgbToHex(stop0.red, stop0.green, stop0.blue);
        const hexEnd = this.rgbToHex(stop1.red, stop1.green, stop1.blue);
        const { legacyDirection, standardDirection } = this.getRealDirection(gradientDirection, gradientType);

        const style = {};
        ['legacy', 'webkit', 'opera', 'mozilla', 'standard'].forEach((browserType) => {
            const direction = browserType === 'standard' ? standardDirection : legacyDirection;
            style[browserType] = this.getCSS(browserType, gradientType, direction, hexStart, hexEnd);
        });

        return style;
    }

    getCurrentBrowserType() {
        // TODO: In a real app, use feature detection to figure out what css to actually app.
        // for now, just assume we are using a standards complient browser
        return 'standard';
    }

    /**
     * Prints the css out for copying by the user
     */
    printCSS(style) {
        return Object.keys(style).map(k => <div key={k} className="css-line">background: {style[k]}</div>);
    }

    render() {
        const style = this.buildStyle();
        const css = this.printCSS(style);
        const browserType = this.getCurrentBrowserType();

        const previewStyle = {
            background: style[browserType].replace(/;.*$/, ''),
        };

        return (
            <div className="preview">
                <div className="color-swatch" style={previewStyle} />
                <div className="css-block">{css}</div>
            </div>
        );
    }
}
