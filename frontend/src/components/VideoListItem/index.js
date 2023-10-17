import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import "./VideoListItem.css"

const VideoListItem = ({video})=>{
    // console.log(video)
    const {title, description, userId, videoUrl, photoUrl} = video
    const history = useHistory();
    const handleClick = (e)=>{
        e.preventDefault();
        console.log(video.id);
        history.push(`/videos/${(video.id)}`);
    }
    return (
        <div className="video-list" >
                <a onClick={handleClick}>
                    <img className="video-pic" src={video.photoUrl}/>
                    <p>{video.title}</p>
                    <p>{video.uploader}</p>
                </a>
        </div>
    )
};

export default VideoListItem;
