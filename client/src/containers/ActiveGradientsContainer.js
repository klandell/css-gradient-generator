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

    initGradients(data) {
        const { actions, dispatch } = this.props;
        const previews = Object.values(data).filter(gradient => gradient.gradientId !== this.gradientId);

        dispatch(actions.initGradients(previews));
    }

    addGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.addGradient(data));
    }

    updateGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.updateGradient(data));
    }

    deleteGradient(data) {
        const { actions, dispatch } = this.props;
        dispatch(actions.deleteGradient(data.gradientId));
    }

            /*
            const socket = io.connect('http://localhost:8081');
            // emit a join message when the connection is successful
            socket.on('connect', () => {
                socket.emit('join', 'Successfully connected to server');
            });
            // alert a message when reieved from the server
            // we can do anything we want in this listener
            socket.on('message', (data) => {
                alert(data);
            });
            // sumbit the form value as a message to the server
            function doFormSubmit(form) {
                const message = form.elements.message.value;
                socket.emit('message', message);
                return false;
            }
            */


    render() {
        const { activeGradients } = this.props.gradients;

        return (
            <ActiveGradients
                gradients={activeGradients}
            />
        );
    }
}
