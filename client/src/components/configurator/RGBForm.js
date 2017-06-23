import React from 'react';
import PropTypes from 'prop-types';

export default class RGBForm extends React.Component {
    static PropTypes = {
        red: PropTypes.number.isRequired,
        green: PropTypes.number.isRequired,
        blue: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    onRGBChange(e) {
        const value = parseInt(e.currentTarget.value, 10);
        const { onChange } = this.props;

        if (!value || (value > 0 && value <= 255)) {
            onChange(e);
        }
    }

    render() {
        const { red, green, blue } = this.props;

        return (
            <form className="color-form">
                <div>
                    <label htmlFor="red">R</label>
                    <input
                        type="number"
                        name="red"
                        value={red}
                        onChange={e => this.onRGBChange(e)}
                        min="0"
                        max="255"
                    />
                </div>
                <div>
                    <label htmlFor="green">G</label>
                    <input
                        type="number"
                        name="green"
                        value={green}
                        onChange={e => this.onRGBChange(e)}
                        min="0"
                        max="255"
                    />
                </div>
                <div>
                    <label htmlFor="blue">B</label>
                    <input
                        type="number"
                        name="blue"
                        value={blue}
                        onChange={e => this.onRGBChange(e)}
                        min="0"
                        max="255"
                    />
                </div>
            </form>
        );
    }
}
