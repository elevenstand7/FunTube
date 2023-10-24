import csrfFetch from "./csrf";

export const ADD_COMMENT = 'comments/addComment';
export const RECEIVE_VIDEO_COMMENTS = 'comments/receiveVideoComments';
export const RECEIVE_COMMENT = 'comments/receiveComment';
export const UPDATE_COMMENT = 'comments/updateComment';
export const DELETE_COMMENT = 'comments/deleteComment';

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

const receiveVideoComments = comments => ({
    type: RECEIVE_VIDEO_COMMENTS,
    comments
});

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
});

const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
});

export const createComment = ({body}, videoId) => async (dispatch, getState) =>{
    const { session } = getState();
    // debugger
    const res = await csrfFetch(`/api/videos/${videoId}/comments`, {
        method:'POST',
        body: JSON.stringify(
            {
                body: body,
                author_id:session.user.id,
                video_id: videoId
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    // debugger
    if(res.ok){
        const {comment} = await res.json();
        // debugger
        dispatch(addComment(comment));
        return true;
    }else{
        return false;
    }

}

export const destroyComment = commentId => async dispatch =>{
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method:'DELETE'
    })
    if(res.ok){
        const data = await res.json();
        dispatch(deleteComment(commentId));
        return res;
    }
}

export const updateVideoComment = (comment) => async dispatch =>{
    // debugger
    const res = await csrfFetch(`/api/comments/${comment.id}`,{
        method: 'PATCH',
        body: JSON.stringify(comment),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    // debugger
    if(res.ok){
        const {comment} = await res.json();
        dispatch(addComment(comment))
    }
}

export const getVideoComments = (videoId) => async dispatch =>{
    const res = await csrfFetch(`/api/videos/${videoId}/comments`);
    // const res = await csrfFetch(`/api/comments`);
    // console.log("res",res);
    if(res.ok){
        const {comments} = await res.json();
        // console.log(comments);
        dispatch(receiveVideoComments(comments));
        return res;
    }
}





const commentsReducer = (state={}, action)=>{
    const nextState = {...state};
    switch(action.type){
        case ADD_COMMENT:
            // debugger
            nextState[action.comment.id] = action.comment;
            return nextState;
        case DELETE_COMMENT:
            delete nextState[action.commentId]
            return nextState;
        case RECEIVE_VIDEO_COMMENTS:
            return { ...action.comments};
        default:
            return nextState;
    }

}

export default commentsReducer;
