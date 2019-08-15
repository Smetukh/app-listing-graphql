import {createReducer} from './../../utils';
import constants from './../../constants';

const {CHECK_PASSWORD_REQUEST, CHECK_PASSWORD_SUCCESS, CHECK_PASSWORD_FAILURE
} = constants;

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};


export default createReducer(initialState, {

    //examples
    [CHECK_PASSWORD_REQUEST]: (state = [], payload) => {
        return Object.assign({}, state, {
            'statusText': 'Checking profile password match'
        });
    },
    [CHECK_PASSWORD_SUCCESS]: (state = [], payload) => {
        return Object.assign({}, state, {
            'statusText': 'You have been successfully logged in. ' + payload.statusText
        });

    },
    [CHECK_PASSWORD_FAILURE]: (state = [], payload) => {
        return Object.assign({}, state, {
            'statusText': `Authentication Error: status: ${payload.status.status}, response: ${payload.status.statusText}`
        });
    },
    
});