import React from 'react';
import PropTypes from 'prop-types';
import Preview from 'Components/Preview';
require('Sass/components/ActiveGradients.scss');

export default class ActiveGradients extends React.Component {
    static propType = {
        gradients: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    /**
     * Maps a gradient object to a preview component
     */
    renderPreviews() {
        const { gradients } = this.props;

        return gradients.map(o => (
            <Preview
                key={o.gradientId}
                stops={o.stops}
                gradientType={o.gradientType}
                gradientDirection={o.gradientDirection}
            />
        ));
    }

    render() {
        const previews = this.renderPreviews();
        return (
            <div className="active-gradients">
                {previews}
            </div>
        );
    }
}
