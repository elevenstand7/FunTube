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

    const handleClickUploader = e =>{
        e.preventDefault();
        history.push(`/${userId}/channel`);
    }
    return (
        <div className="video-list" >
            <div className="video-pic-container clickable"><img className="video-pic" src={video.photoUrl} onClick={handleClick}/></div>
            <div className="video-list-title clickable" onClick={handleClick}>{video.title}</div>
            <div className="video-list-uploader clickable" onClick={handleClickUploader}>{video.uploader}</div>
        </div>
    )
};

export default VideoListItem;
