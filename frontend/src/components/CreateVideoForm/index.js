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
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if (!title || !video || !description || !thumbnail){
            alert('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);

        const resp = await dispatch(createVideo(formData));

        if(resp){
            setTitle("");
            setDescription("");
            setThumbnail(null);
            setVideo(null);
        }
    }

    const handleVideoPicture = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
      };

      const handleVideo = (e)=>{
        const file = e.target.files[0];
        setVideo(file);
      }

    return (
        <div className='upload-video-form'>
            <form className="video-container" onSubmit={handleSubmit}>
                <input className='upload-video-title' type='text' placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title}></input>
                <input className='upload-video-description' type='text' placeholder='Description' onChange={e=>setDescription(e.target.value)} value={description}></input>
                <div className='thumbnail'>Thumbnail
                    <div><span>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention</span></div>
                    <input type="file" onChange={handleVideoPicture} accept="image/*"/>
                </div>
                <div className='upload-video-box'>
                    <div>Select the video files to upload</div>
                    <input type="file" onChange={handleVideo} accept="video/*"/>
                </div>

                <button className='btn upload-video-btn clickable' >Upload</button>
            </form>

        </div>
    )

}

export default CreateVideoForm;
