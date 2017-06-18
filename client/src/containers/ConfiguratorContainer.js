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
    componentDidMount() {
        this.gradientId = `gradient-${new Date().valueOf()}`;
        this.broadcastGradient('add');

        // remove the gradient on refresh
        window.onbeforeunload = () => {
            this.broadcastGradient('delete');
        };
    }
    componentDidUpdate() {
        this.broadcastGradient('update');
    }
    componentWillUnmount() {
        this.broadcastGradient('delete');
    }

    onSliderChange(colorValues) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateSliderColor(colorValues));
    }

    onPickerChange(colorValues) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updatePickerColor(colorValues));
    }

    onColorInputChange(e) {
        const { actions, dispatch, configurator } = this.props;
        const name = e.currentTarget.getAttribute('name');
        const value = e.currentTarget.value;

        const colorValues = ['red', 'green', 'blue'].map(attr => (attr === name ? parseInt(value, 10) : configurator[attr]));
        dispatch(actions.updatePickerColor(colorValues));
    }

    onHexChange(arg) {
        const { actions, dispatch } = this.props;

        if (Array.isArray(arg)) {
            dispatch(actions.updatePickerColor(arg));
        } else {
            dispatch(actions.updateHex(arg.currentTarget.value));
        }
    }

    onStopClick(e) {
        const { actions, dispatch } = this.props;
        const key = e.currentTarget.getAttribute('data-key');
        dispatch(actions.updateSelectedStop(parseInt(key, 10)));
    }

    onGradientTypeSelect(e) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradientType(e.currentTarget.value));
    }

    onGradientDirectionSelect(e) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradientDirection(e.currentTarget.value));
    }

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
