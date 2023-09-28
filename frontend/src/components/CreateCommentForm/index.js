import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createComment } from '../../store/comments';
import button from 'bootstrap';
import "./CreateCommentForm.css"

const CreateCommentForm = ({videoId, onCommentChange})=>{
    // console.log("videoId",videoId);
    const dispatch = useDispatch();
    // const {commentId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [body, setBody] = useState("");
    



    const handleSubmit = async(e)=>{
        e.preventDefault();
        debugger
        const resp = await dispatch(createComment({body},videoId));

        if(resp){
            onCommentChange();
            setBody("");
        }

    }

    return (
        <div className='comment-form'>
            <form className="user-input-container" onSubmit={handleSubmit}>
                <textarea id='user-input' placeholder='Add a comment...' onChange={e=>setBody(e.target.value)} value={body}></textarea>
                <button className='btn comment-btn' >Comment</button>
            </form>

        </div>
    )

}

export default CreateCommentForm;