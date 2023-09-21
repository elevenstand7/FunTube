import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import p1 from './p1.png'
import "./VideoListItem.css"

const VideoListItem = ({video})=>{
    const {title, description, userId, videoUrl, photoUrl} = video
    const history = useHistory();
    const handleClick = ()=>{
        // e.preventDefault();
        history.push(`/`);
    }
    return (
        <div className="video-list" >
                <a onClick={handleClick}>
                    <img className="video-pic" src={video.photoUrl}/>
                    <h3>{video.title}</h3>
                    {/* <p>{video.userId.username}</p> */}
                </a>
                {/* <Player
                    poster="./p1.png"
                    src={video.videoUrl}
                /> */}

        </div>
    )
};

export default VideoListItem;
