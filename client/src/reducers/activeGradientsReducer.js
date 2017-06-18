const C = require('Constants');

export default function reducer(state = {
    activeGradients: [],
}, action) {
    switch (action.type) {
    case C.INIT_GRADIENTS:
        return {
            ...state,
            activeGradients: action.activeGradients,
        };
    case C.ADD_GRADIENT:
        return {
            ...state,
            activeGradients: [...state.activeGradients, action.gradient],
        };
    case C.UPDATE_GRADIENT:
        return {
            ...state,
            activeGradients: state.activeGradients.map((gradient) => {
                if (gradient.gradientId === action.gradient.gradientId) {
                    return action.gradient;
                }
                return gradient;
            }),
        };
    case C.DELETE_GRADIENT:
        return {
            ...state,
            activeGradients: state.activeGradients.filter(gradient => gradient.gradientId !== action.gradientId),
        };
    default:
        return state;
    }
}
