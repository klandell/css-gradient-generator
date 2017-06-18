import { combineReducers } from 'redux';
import gradients from 'Reducers/activeGradientsReducer';
import configurator from 'Reducers/configuratorReducer';

/**
 * Combines each individual reducers into a single reducer.
 */

export default combineReducers({
    gradients,
    configurator,
});
