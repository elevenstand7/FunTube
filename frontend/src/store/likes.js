import csrfFetch from "./csrf.js";

export const ADD_LIKE = 'likes/ADD_LIKE';
export const GET_LIKES = 'likes/GET_LIKES';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';
export const GET_USER_LIKES = 'likes/GET_USER_LIKES';

const addLike = like =>({
    type: ADD_LIKE,
    like
})

const getLikes = likes =>({
    type: GET_LIKES,
    likes
})

const removeLike = likeId =>({
    type: REMOVE_LIKE,
    likeId
})

const getUserLikes = likes =>({
    type: GET_USER_LIKES,
    likes
})

export const hasLikedVideo = (state,videoId, userId ) =>{
    const likes = Object.values(state.likes);

    return likes.some(like => like.video_id === videoId && like.user_id === userId);
}

export const fetchLikes = () => async dispatch => {
    const res = await fetch("/api/likes");

    if(res.ok) {
        const likes = await res.json();
        console.log(res);
        dispatch(getLikes(likes));
    }
};

export const fetchUserLikes = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/likes`);
    if(res.ok) {
        const userlikes = await res.json();
        console.log(userlikes);
        dispatch(getUserLikes(userlikes));
        return res;
    }
}


export const createLike = videoId => async (dispatch, getState) =>{
    const { session } = getState();
    // debugger
    const res = await csrfFetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({
            user_like: true,
            user_id:session.user.id,
            video_id: videoId
        })
    });
    const data = await res.json();
    console.log(data)
    dispatch(addLike(data.like));
    return data;
};

export const deleteLike = likeId => async dispatch =>{
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    dispatch(removeLike(data.like));
    return data;
};


const likesReducer = (state = {}, action) => {
    const nextState = {...state};

    switch(action.type){
        case GET_LIKES:
            return {...nextState, ...action.likes};
        case ADD_LIKE:
            nextState[action.like.id] = action.like;
            return nextState;
        case REMOVE_LIKE:
            delete nextState[action.likeId]
            return nextState;
        case GET_USER_LIKES:
            return {...nextState, userLikes: action.likes};
        default:
            return nextState;
    }

}

export default likesReducer;
