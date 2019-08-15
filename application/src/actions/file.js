import constants from './../constants';

const {MODULES_UPDATE_STATE, CLEAR_MODULE_SEARCH_CHANNEL, CLEAR_MODULE_FORWARD} = constants;

export function modulesUpdateState(moduleName, state, value) {

    return {
        type: MODULES_UPDATE_STATE,
        payload: {moduleName, state, value}
    }
};

export function clearModuleSearchChannel() {

    return {
        type: CLEAR_MODULE_SEARCH_CHANNEL,
        payload: null
    }
};

export function clearModuleForward() {

    return {
        type: CLEAR_MODULE_FORWARD,
        payload: null
    }
};
