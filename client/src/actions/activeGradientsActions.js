const C = require('Constants');

export function initGradients(activeGradients) {
    return {
        type: C.INIT_GRADIENTS,
        activeGradients,
    };
}
export function addGradient(gradient) {
    return {
        type: C.ADD_GRADIENT,
        gradient,
    };
}

export function updateGradient(gradient) {
    return {
        type: C.UPDATE_GRADIENT,
        gradient,
    };
}

export function deleteGradient(gradientId) {
    return {
        type: C.DELETE_GRADIENT,
        gradientId,
    };
}
