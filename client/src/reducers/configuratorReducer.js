const C = require('Constants');

function rgbToHex(red, green, blue) {
    return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}

export default function reducer(state = {
    colorValues: [255, 0, 0],
    sliderColor: 'rgba(255, 0, 0, 1)',
    pickerColor: 'rbga(255, 0, 0, 1)',
    red: 255,
    green: 0,
    blue: 0,
    hex: '#ff0000',
    stops: [
        {
            red: 255,
            green: 0,
            blue: 0,
        },
        {
            red: 0,
            green: 0,
            blue: 255,
        },
    ],
    selectedStop: 0,
    gradientType: 'linear',
    gradientDirection: 'top',
}, action) {
    const colorValues = action.colorValues || [];
    const selectedStop = action.selectedStop;
    let red;
    let green;
    let blue;
    let stops;

    switch (action.type) {
    case C.UPDATE_SLIDER_COLOR:
        [red, green, blue] = colorValues;
        return {
            ...state,
            sliderColor: `rgba(${red}, ${green}, ${blue}, 1)`,
        };
    case C.UPDATE_PICKER_COLOR:
        [red, green, blue] = colorValues;
        return {
            ...state,
            colorValues,
            pickerColor: `rgba(${red}, ${green}, ${blue}, 1)`,
            red,
            green,
            blue,
            hex: rgbToHex(red, green, blue),
            stops: state.stops.map((o, i) => {
                if (i === state.selectedStop) {
                    return {
                        red,
                        green,
                        blue,
                    };
                }
                return o;
            }),
        };
    case C.UPDATE_SELECTED_STOP:
        stops = state.stops;
        red = stops[selectedStop].red;
        green = stops[selectedStop].green;
        blue = stops[selectedStop].blue;

        return {
            ...state,
            colorValues: [red, green, blue],
            pickerColor: `rgba(${red}, ${green}, ${blue}, 1)`,
            red,
            green,
            blue,
            hex: rgbToHex(red, green, blue),
            selectedStop,
        };
    case C.UPDATE_GRADIENT_TYPE:
        return {
            ...state,
            gradientType: action.gradientType,
        };
    case C.UPDATE_GRADIENT_DIRECTION:
        return {
            ...state,
            gradientDirection: action.gradientDirection,
        };
    case C.UPDATE_HEX_VALUE:
        return {
            ...state,
            hex: action.hex,
        };
    default:
        return state;
    }
}
