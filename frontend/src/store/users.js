import csrfFetch from "./csrf.js";

export const RECEIVE_USER = 'users/RECEIVE_USER';
export const RECEIVE_USERS = 'users/RECEIVE_USERS';
const ADD_USER = 'users/addUser';

const receiveUser = user =>{
    return {
        type: RECEIVE_USER,
        user
    }
}

const receiveUsers = users =>{
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
  });


export const fetchUser = (userId) => async dispatch =>{
    // debugger
    const res = await csrfFetch(`/api/users/${userId}`)
    if(res.ok){
        const {user} = await res.json();
        if(user.id){
            dispatch(receiveUser(user));
        }
        // return res;
    }
}

export const fetchUsers = () => async dispatch =>{
    const res = await csrfFetch(`/api/users`)
    if(res.ok){
        const users = await res.json();
        dispatch(receiveUsers(users));
        // return res;
    }
}

const usersReducer = (state={}, action)=>{
    const nextState = {...state};
    switch(action.type){
        case RECEIVE_USER:
            // debugger
            nextState[action.user.id] = action.user
            return nextState;
        case RECEIVE_USERS:
            return {...nextState, ...action.users}
        default:
            return nextState;
    }
}



export default usersReducer;
