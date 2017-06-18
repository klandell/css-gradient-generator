import React from 'react';
import { connect } from 'react-redux';
import Preview from 'Components/Preview';

@connect(state => state)
export default class ConfiguratorContainer extends React.Component {
    render() {
        const { configurator } = this.props;
        const { stops, gradientType, gradientDirection } = configurator;

        return (
            <Preview
                stops={stops}
                gradientType={gradientType}
                gradientDirection={gradientDirection}
            />
        );
    }
}
