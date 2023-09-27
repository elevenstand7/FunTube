import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import button from 'bootstrap';
import "./CreateCommentForm.css"

const CreateCommentForm = ()=>{
    const dispatch = useDispatch();
    const {commentId} = useParams();

    return (
        <div>
            <div className="user-input-container">
                <textarea id='user-input' placeholder='Add a comment...'></textarea>
                <button className='btn comment-btn'>Comment</button>
            </div>
        </div>
    )

}

export default CreateCommentForm;