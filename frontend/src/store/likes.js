import csrfFetch from "./csrf.js";

export const ADD_LIKE = 'likes/addLike';
export const REMOVE_LIKE = 'likes/removeLike';

const addLike = like =>({
    type: ADD_LIKE,
    like
})

const removeLike = like =>({
    type: REMOVE_LIKE,
    like
})

export const createLike = like => async dispatch =>{
    const res = await csrfFetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({


        })
    });
    const data = await res.json();
    dispatch(addLike(data.like));
};

export const deleteLike = likeId => async dispatch =>{
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    dispatch(removeLike(data.like));
};


const likesReducer = (state = {}, action) => {
    const nextState = {...state};

    switch(action.type){
        case ADD_LIKE:
            nextState[action.like.id] = action.like;
            return nextState;
        case REMOVE_LIKE:
            delete nextState[action.like.id]
            return nextState
        default:
            return nextState;
    }

}

export default likesReducer;
