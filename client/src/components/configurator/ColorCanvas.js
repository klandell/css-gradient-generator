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

    /**
     * When the component mounts we draw on the canvas so that the user has
     * something to choose right away.
     */
    componentDidMount() {
        this.draw();
    }

    /**
     * Every time one of the props on this component is updated, we have to
     * redraw the canvas to pick up the changes.
     */
    componentDidUpdate() {
        this.reDraw();
    }

    /**
     * Relay a click event on the canvas
     */
    onClick(e) {
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;
        const imageData = this.getContext().getImageData(offsetX, offsetY, 1, 1).data;

        this.props.onColorSelected(imageData.slice(0, 3));
    }

    /**
     * Return the canvas context
     */
    getContext() {
        return this.canvas.getContext('2d');
    }

    getWidth() {
        return this.canvas.width;
    }

    getHeight() {
        return this.canvas.height;
    }

    /**
     * Clears the canvas completely and does a full draw
     */
    reDraw() {
        const canvas = this.canvas;

        this.getContext().clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
    }

    /**
     * The draw method is unique for the extending component, so this method
     * is only implemented there
     */
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
