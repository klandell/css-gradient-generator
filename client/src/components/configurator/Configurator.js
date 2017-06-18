import React from 'react';
import PropTypes from 'prop-types';
import RGBForm from 'Components/configurator/RGBForm';
import ColorPicker from 'Components/configurator/ColorPicker';
import ColorSlider from 'Components/configurator/ColorSlider';
import DirectionForm from 'Components/configurator/DirectionForm';
import Stops from 'Components/configurator/Stops';
require('Sass/components/configurator/Configurator.scss');

export default class Configurator extends React.Component {
    static PropTypes = {
        onSliderChange: PropTypes.func.isRequired,
        onPickerChange: PropTypes.func.isRequired,
        onColorInputChange: PropTypes.func.isRequired,
        onStopClick: PropTypes.func.isRequired,
        onGradientTypeSelect: PropTypes.func.isRequired,
        onGradientDirectionSelect: PropTypes.func.isRequired,
        onHexChange: PropTypes.func.isRequired,
        configuratorState: PropTypes.shape({
            sliderColor: PropTypes.string.isRequired,
            pickerColor: PropTypes.string.isRequired,
            red: PropTypes.number.isRequired,
            green: PropTypes.number.isRequired,
            blue: PropTypes.number.isRequired,
            hex: PropTypes.string.isRequired,
            stops: PropTypes.array.isRequired,
            selectedStop: PropTypes.number.isRequired,
            gradientType: PropTypes.string.isRequired,
            gradientDirection: PropTypes.string.isRequired,
        }).isRequired,
    }

    render() {
        const {
            onSliderChange,
            onPickerChange,
            onColorInputChange,
            configuratorState,
            onStopClick,
            onGradientTypeSelect,
            onGradientDirectionSelect,
            onHexChange,
        } = this.props;

        const {
            sliderColor,
            pickerColor,
            red,
            green,
            blue,
            hex,
            stops,
            selectedStop,
            gradientType,
            gradientDirection,
        } = configuratorState;

        return (
            <div className="configurator">
                <ColorSlider
                    className="color-slider"
                    height={300}
                    width={25}
                    onColorSelected={onSliderChange}
                />
                <ColorPicker
                    className="color-picker"
                    height={300}
                    width={300}
                    onColorSelected={onPickerChange}
                    sliderColor={sliderColor}
                    pickerColor={pickerColor}
                />
                <div className="color-inputs">
                    <Stops
                        stops={stops}
                        onStopClick={onStopClick}
                        selectedStop={selectedStop}
                    />
                    <RGBForm
                        red={red}
                        green={green}
                        blue={blue}
                        onChange={onColorInputChange}
                    />
                    <DirectionForm
                        gradientType={gradientType}
                        onGradientTypeSelect={onGradientTypeSelect}
                        gradientDirection={gradientDirection}
                        onGradientDirectionSelect={onGradientDirectionSelect}
                        hex={hex}
                        onHexChange={onHexChange}
                    />
                </div>
            </div>
        );
    }
}
