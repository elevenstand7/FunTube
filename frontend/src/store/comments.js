import csrfFetch from "./csrf";

export const ADD_COMMENT = 'comments/addComment';
export const RECEIVE_COMMENTS = 'comments/receiveComments';
export const RECEIVE_COMMENT = 'comments/receiveComment';
export const UPDATE_COMMENT = 'comments/updateComment';
export const DELETE_COMMENT = 'comments/deleteComment';

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
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

export const createComment = comment => async dispatch =>{
    const res = await csrfFetch('/api/comments', {
        method:'POST',
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    dispatch(addComment(comment));
    return res;
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