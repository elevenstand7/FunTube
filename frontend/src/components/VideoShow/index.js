import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import p1 from './p1.png'
import "./VideoShow.css"

const VideoShow = ({video})=>{
    const {title, description, userId, videoUrl} = video
    console.log(video.title)
    return (
        <div className="video-item" >
            <div className="row1">
                <a>
                    <img className="video-pic" src={p1}/>
                    <h2>{video.title}</h2>
                </a>
                {/* <Player
                    poster="./p1.png"
                    src={video.videoUrl}
                /> */}

            </div>

        </div>
    )
};

export default VideoShow;
