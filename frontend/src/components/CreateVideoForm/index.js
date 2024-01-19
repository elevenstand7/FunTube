import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from '../../store/videos';
import "./CreateVideoForm.css"

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
        <div className='upload-video-form'>
            <form className="video-container" onSubmit={handleSubmit}>
                <input className='upload-video-title' type='text' placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title}></input>
                <textarea className='upload-video-description' placeholder='Description' onChange={e=>setDescription(e.target.value)} value={description}></textarea>
                <div>Thumbnail</div>
                <div><span>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention</span></div>
                <input type="file" />

                <button className='btn upload-video-btn clickable' >Upload</button>
            </form>

        </div>
    )

}

export default CreateVideoForm;
