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
        // console.log(video.id);
        history.push(`/videos/${(video.id)}`);
    }
    return (
        <div className="video-list" >
            <div className="video-pic-container"><img className="video-pic" src={video.photoUrl} onClick={handleClick}/></div>
            <div>{video.title}</div>
            <div>{video.uploader}</div>
        </div>
    )
};

export default VideoListItem;
