import { csrfFetch } from "./csrf";

    // ACTION TYPES
    const SET_CURRENT_USER = 'session/setCurrentUser';
    const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

    // ACTION CREATORS
    export const setCurrentUser = user => ({
        type: SET_CURRENT_USER,
        user
    });

    export const removeCurrentUser = () => ({
        type: REMOVE_CURRENT_USER
    });

    // THUNK ACTION CREATORS
    export const loginUser = user => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        debugger
        dispatch(setCurrentUser(data.user))
    };

    export const logoutUser = userId => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'DELETE'
        });
        sessionStorage.setItem('currentUser', null)
        dispatch(removeCurrentUser(userId));
    }

    export const createUser = user => async dispatch => {
        let res = await csrfFetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(setCurrentUser(data.user));
    }

    // REDUCER
    const sessionReducer = ( state = {}, action ) => {
        const nextState = { ...state };

        switch(action.type) {
            case SET_CURRENT_USER:
                debugger
                return {...nextState, user: action.user}

            case REMOVE_CURRENT_USER:
                return { ...nextState, user: null };
            default:
                return state;
        }
    };

    export default sessionReducer
