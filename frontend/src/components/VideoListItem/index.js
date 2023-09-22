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
