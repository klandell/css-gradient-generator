import React from 'react';
import PropTypes from 'prop-types';

export default class ColorPicker extends React.Component {
    static PropTypes = {
        className: PropTypes.string,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        onColorSelected: PropTypes.func.isRequired,
    }

    static defaultProps = {
        className: '',
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.reDraw();
    }

    onClick(e) {
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;
        const imageData = this.getContext().getImageData(offsetX, offsetY, 1, 1).data;

        this.props.onColorSelected(imageData.slice(0, 3));
    }

    getContext() {
        return this.canvas.getContext('2d');
    }

    getWidth() {
        return this.canvas.width;
    }

    getHeight() {
        return this.canvas.height;
    }

    reDraw() {
        const canvas = this.canvas;

        this.getContext().clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
    }

    draw() {}

    render() {
        const { className, height, width } = this.props;
        return (
            <canvas
                className={className}
                width={width}
                height={height}
                onClick={e => this.onClick(e)}
                ref={(c) => { this.canvas = c; }}
            />
        );
    }
}
