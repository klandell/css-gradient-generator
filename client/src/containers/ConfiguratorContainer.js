import React from 'react';
import { connect } from 'react-redux';
import {
    updateSliderColor,
    updatePickerColor,
    updateSelectedStop,
    updateGradientType,
    updateGradientDirection,
    updateHex,
} from 'Actions/configuratorActions';
import Configurator from 'Components/configurator/Configurator';
import socket from '../socket';

@connect(state => state, dispatch => ({
    actions: {
        updateSliderColor,
        updatePickerColor,
        updateSelectedStop,
        updateGradientType,
        updateGradientDirection,
        updateHex,
    },
    dispatch,
}))
export default class ConfiguratorContainer extends React.Component {
    /**
     * Add our gradient to the master list
     */
    componentDidMount() {
        this.gradientId = `gradient-${new Date().valueOf()}`;
        this.broadcastGradient('add');

        // remove the gradient on refresh
        window.onbeforeunload = () => {
            this.broadcastGradient('delete');
        };
    }

    /**
     * If this component needs to be updated, also update the gradient on
     * the back end.
     */
    componentDidUpdate() {
        this.broadcastGradient('update');
    }

    /**
     * This emits a delete event on our socket.  It will delete our current
     * gradient from the master list on the server.
     */
    componentWillUnmount() {
        this.broadcastGradient('delete');
    }

    /**
     * Update the base color of the color picker.
     */
    onSliderChange(colorValues) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateSliderColor(colorValues));
    }

    /**
     * We just selected a color, this has the same effect as manually
     * keying a rgb or hex values
     */
    onPickerChange(colorValues) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updatePickerColor(colorValues));
    }

    /**
     * When one of the RGB values change, update the gradient
     */
    onColorInputChange(e) {
        const { actions, dispatch, configurator } = this.props;
        const name = e.currentTarget.getAttribute('name');
        const value = e.currentTarget.value;

        const colorValues = ['red', 'green', 'blue'].map(attr => (attr === name ? parseInt(value, 10) : configurator[attr]));
        dispatch(actions.updatePickerColor(colorValues));
    }

    /**
     * Update the hex string or RGB values.  If the hex code is valid, update
     * only the RGB values, and this will fully update the state of our configurator.
     * Otherwise, if the hex string is not valid, just update the value in the box.
     */
    onHexChange(arg) {
        const { actions, dispatch } = this.props;

        if (Array.isArray(arg)) {
            dispatch(actions.updatePickerColor(arg));
        } else {
            dispatch(actions.updateHex(arg.currentTarget.value));
        }
    }

    /**
     * Switch the stop that is currently being edited
     */
    onStopClick(e) {
        const { actions, dispatch } = this.props;
        const key = e.currentTarget.getAttribute('data-key');
        dispatch(actions.updateSelectedStop(parseInt(key, 10)));
    }

    /**
     * Dispatch an action to updat the gradient's type
     */
    onGradientTypeSelect(e) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradientType(e.currentTarget.value));
    }

    /**
     * Dispatch an action to update the gradient's direction
     */
    onGradientDirectionSelect(e) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradientDirection(e.currentTarget.value));
    }

    /**
     * Any time the gradient we are working with is updated, notify all
     * interested parties. This method is also called on mount and unmount/onbeforeunload
     * to add and remove our gradient from the master list respectively.
     */
    broadcastGradient(action) {
        const { configurator } = this.props;
        const { stops, gradientDirection, gradientType } = configurator;
        const data = Object.assign({}, {
            gradientId: this.gradientId,
            stops,
            gradientDirection,
            gradientType,
        });

        socket.emit(action, data);
    }

    render() {
        const { configurator } = this.props;

        return (
            <Configurator
                onSliderChange={e => this.onSliderChange(e)}
                onPickerChange={e => this.onPickerChange(e)}
                onColorInputChange={e => this.onColorInputChange(e)}
                onHexChange={e => this.onHexChange(e)}
                onStopClick={e => this.onStopClick(e)}
                onGradientTypeSelect={e => this.onGradientTypeSelect(e)}
                onGradientDirectionSelect={e => this.onGradientDirectionSelect(e)}
                configuratorState={configurator}
            />
        );
    }
}
