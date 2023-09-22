import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import button from 'bootstrap';
import momo from './momo.png'
import { getVideo, fetchVideo } from "../../store/videos";

import "./VideoShowPage.css"

const VideoShowPage = ()=>{
    const dispatch = useDispatch();
    const { videoId } = useParams();
    // console.log("videoId", videoId)

    // const video = useSelector(getVideo(videoId));
    const video = useSelector(state => state.videos[videoId]);
    // console.log("video2", video)
    useEffect(()=>{
        if(!video){
            dispatch(fetchVideo(videoId))
        }
    },[dispatch, videoId])

    if(!video){
        return <div>Loading...</div>
    }
    const {title, description, userId, videoUrl, uploader, photoUrl} = video


    return (
        <div className="video-container">
            <video
                className="video-player"
                controls
                poster={photoUrl}
                src={videoUrl}
                type="video/mp4"
                // autoPlay
            />
            <div className="video-content">
                <div className="top-row">
                    <h4>{title}</h4>
                </div>
                <div className="middle-row">
                    <div className="user-info">
                        <img className="avatar" src={momo}></img>
                        <h5>{uploader}</h5>
                    </div>
                    <button className="favi-btn btn btn-light ">
                        <i className="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div className="bottom-row">
                    <p>{description}</p>
                </div>
            </div>


        </div>
    )

}

export default VideoShowPage;
