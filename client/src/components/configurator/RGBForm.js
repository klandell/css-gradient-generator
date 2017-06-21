import React from 'react';
import PropTypes from 'prop-types';

export default class RGBForm extends React.Component {
    static PropTypes = {
        red: PropTypes.number.isRequired,
        green: PropTypes.number.isRequired,
        blue: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    render() {
        const { red, green, blue, onChange } = this.props;

        return (
            <form className="color-form">
                <div>
                    <label htmlFor="red">R</label>
                    <input type="number" name="red" value={red} onChange={onChange} min="0" max="255" />
                </div>
                <div>
                    <label htmlFor="green">G</label>
                    <input type="number" name="green" value={green} onChange={onChange} min="0" max="255" />
                </div>
                <div>
                    <label htmlFor="blue">B</label>
                    <input type="number" name="blue" value={blue} onChange={onChange} min="0" max="255" />
                </div>
            </form>
        );
    }
}
