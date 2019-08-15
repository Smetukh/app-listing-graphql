import {createReducer} from './../../utils';
import constants from './../../constants';

const {
    MODULES_UPDATE_STATE,
    CLEAR_MODULE_SEARCH_CHANNEL,
    SEARCH_CHANNEL_REQUEST,
    SEARCH_CHANNEL_REQUEST_SUCCESS,
    SEARCH_CHANNEL_REQUEST_FAILURE,
    COMPANIES_REQUEST,
    COMPANIES_REQUEST_SUCCESS,
    COMPANIES_REQUEST_FAILURE,
    MANAGERS_REQUEST,
    MANAGERS_REQUEST_SUCCESS,
    MANAGERS_REQUEST_FAILURE,
    CHAT_FORWARD_REQUEST,
    CHAT_FORWARD_REQUEST_SUCCESS,
    CHAT_FORWARD_REQUEST_FAILURE,
    CLEAR_MODULE_FORWARD
} = constants;

const initialState = {
    moduleAddChannel: {
        active: [null, null],
        searchQuery: null,
        isRun: false,
        channels: [],
        companies: [],
        error: null
    },
    moduleForward: {
        isRun: false,
        room: null,
        active: [null],
        managers: [],
        forwarded: [],
        error: null
    }
};


export default createReducer(initialState, {
    [MODULES_UPDATE_STATE]: (state, payload) => {
        return {
            ...state, ...{
                [payload.moduleName]: {
                    ...state[payload.moduleName],
                    ...{
                        [payload.state]: payload.value
                    }
                }
            }
        }
    },
    [CLEAR_MODULE_SEARCH_CHANNEL]: (state, payload) => {
        return {
            ...state,
            moduleAddChannel: {
                active: [null, null],
                searchQuery: null,
                isRun: false,
                channels: [],
                companies: [],
                error: null
            }
        }
    },
    [CLEAR_MODULE_FORWARD]: (state, payload) => {
        return {
            ...state,
            moduleForward: {
                isRun: false,
                room: null,
                active: [null],
                managers: [],
                forwarded: [],
                error: null
            }
        }
    },
    [SEARCH_CHANNEL_REQUEST]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: true,
                        channels: [],
                        searchQuery: payload.query,
                        error: null
                    }
                }
            }
        }
    },
    [SEARCH_CHANNEL_REQUEST_SUCCESS]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: false,
                        channels: payload.channels,
                        error: null
                    }
                }
            }
        };
    },
    [SEARCH_CHANNEL_REQUEST_FAILURE]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: false,
                        channels: [],
                        error: payload.error
                    }
                }
            }
        };
    },
    [COMPANIES_REQUEST]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: true,
                        companies: []
                    }
                }
            }
        };
    },
    [COMPANIES_REQUEST_SUCCESS]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: false,
                        companies: payload.companies
                    }
                }
            }
        };
    },
    [COMPANIES_REQUEST_FAILURE]: (state, payload) => {
        return {
            ...state, ...{
                moduleAddChannel: {
                    ...state.moduleAddChannel,
                    ...{
                        isRun: false,
                        companies: [],
                        error: payload.error
                    }
                }
            }
        };
    },
    [MANAGERS_REQUEST]: (state, payload) => {
        return {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: true,
                        managers: []
                    }
                }
            }
        };
    },
    [MANAGERS_REQUEST_SUCCESS]: (state, payload) => {
        let newState = {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: false,
                        managers: payload.managers
                    }
                }
            }
        };
        return newState;
    },
    [MANAGERS_REQUEST_FAILURE]: (state, payload) => {
        return {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: false,
                        managers: [],
                        error: payload.error
                    }
                }
            }
        };
    },
    [CHAT_FORWARD_REQUEST]: (state, payload) => {
        return {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: true,
                        forwarded: [],
                    }
                }
            }
        };
    },
    [CHAT_FORWARD_REQUEST_SUCCESS]: (state, payload) => {
        return {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: false,
                        forwarded: payload.forwarded
                    }
                }
            }
        };
    },
    [CHAT_FORWARD_REQUEST_FAILURE]: (state, payload) => {
        return {
            ...state, ...{
                moduleForward: {
                    ...state.moduleForward,
                    ...{
                        isRun: false,
                        forwarded: [],
                        error: payload.error
                    }
                }
            }
        };
    },
});
