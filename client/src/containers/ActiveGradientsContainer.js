import React from 'react';
import { connect } from 'react-redux';
import { initGradients, addGradient, updateGradient, deleteGradient } from 'Actions/activeGradientsActions';
import ActiveGradients from 'Components/ActiveGradients';
import socket from '../socket';

@connect(state => state, dispatch => ({
    actions: {
        initGradients,
        addGradient,
        updateGradient,
        deleteGradient,
    },
    dispatch,
}))
export default class ActiveGradientsContainer extends React.Component {
    /**
     * Add listeners for the various socket events so that we can update
     * the list of active gradients in real time.  We are using socket.io here.
     * If websockets are not available it will fallback to long polling or
     * polling techniques.
     */
    componentDidMount() {
        socket.emit('join');

        socket.on('join', (data) => {
            this.initGradients(data);
        });

        socket.on('gradientId', (data) => {
            this.gradientId = data;
        });

        // Have unique events for add/update/delete
        // so that the whole array of messages doesn't need
        // to be sent on each change
        socket.on('add', (data) => {
            this.addGradient(data);
        });
        socket.on('update', (data) => {
            this.updateGradient(data);
        });
        socket.on('delete', (data) => {
            this.deleteGradient(data);
        });
    }

    /**
     * When the component first mounts load the full list of active gradients
     */
    initGradients(data) {
        const { actions, dispatch } = this.props;
        const previews = Object.values(data).filter(gradient => gradient.gradientId !== this.gradientId);

        dispatch(actions.initGradients(previews));
    }

    /**
     * Add a new gradient to the list of active gradients
     */
    addGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.addGradient(data));
    }

    /**
     * Upadte a particular gradient
     */
    updateGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradient(data));
    }

    /**
     * Remove a gradient from the list of active gradients
     */
    deleteGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.deleteGradient(data.gradientId));
    }


    render() {
        const { activeGradients } = this.props.gradients;

        return (
            <ActiveGradients
                gradients={activeGradients}
            />
        );
    }
}
