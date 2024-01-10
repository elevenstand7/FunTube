import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const CreateVideoForm = ()=>{

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    return (
        <div className='video-form'>
            <form className="video-container" onSubmit={handleSubmit}>
                <input type='text' placeholder='Title'></input>
                <textarea placeholder='Description' onChange={e=>setBody(e.target.value)} value={description}></textarea>
                <button className='btn comment-btn clickable' >Upload</button>
            </form>

        </div>
    )

}

export default CreateVideoForm;
