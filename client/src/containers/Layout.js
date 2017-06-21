import React from 'react';
import ActiveGradientsContainer from 'Containers/ActiveGradientsContainer';
import ConfiguratorContainer from 'Containers/ConfiguratorContainer';
import PreviewContainer from 'Containers/PreviewContainer';
require('Sass/containers/Layout.scss');

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <h1>CSS Gradient Generator</h1>
                <div className="configurator-wrapper">
                    <ConfiguratorContainer />
                    <PreviewContainer />
                </div>
                <h1>Active Gradients</h1>
                <ActiveGradientsContainer />
            </div>
        );
    }
}
