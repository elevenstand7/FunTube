import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from '../../store/videos';

const CreateVideoForm = ()=>{

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const resp = await dispatch(createVideo({title, description}));

        if(resp){
            setTitle("");
            setDescription("");
        }

    }

    return (
        <div className='video-form'>
            <form className="video-container" onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title}></input>
                <textarea placeholder='Description' onChange={e=>setDescription(e.target.value)} value={description}></textarea>
                <button className='btn comment-btn clickable' >Upload</button>
            </form>

        </div>
    )

}

export default CreateVideoForm;
