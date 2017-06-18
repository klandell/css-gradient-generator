const C = require('Constants');

export function updateSliderColor(colorValues) {
    return {
        type: C.UPDATE_SLIDER_COLOR,
        colorValues,
    };
}

export function updatePickerColor(colorValues) {
    return {
        type: C.UPDATE_PICKER_COLOR,
        colorValues,
    };
}

export function updateHex(hex) {
    return {
        type: C.UPDATE_HEX_VALUE,
        hex,
    };
}

export function updateSelectedStop(selectedStop) {
    return {
        type: C.UPDATE_SELECTED_STOP,
        selectedStop,
    };
}

export function updateGradientType(gradientType) {
    return {
        type: C.UPDATE_GRADIENT_TYPE,
        gradientType,
    };
}

export function updateGradientDirection(gradientDirection) {
    return {
        type: C.UPDATE_GRADIENT_DIRECTION,
        gradientDirection,
    };
}
