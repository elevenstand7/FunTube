import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import { getVideo, fetchVideo } from "../../store/videos";
import "./VideoShowPage.css"

const VideoShowPage = ()=>{
    const dispatch = useDispatch();
    const { videoId } = useParams();
    // console.log(videoId)
    // const video = useSelector(getVideo(videoId));

    const video = useSelector(state => state.videos[videoId]);
    // console.log(video)

    useEffect(()=>{
        if(!video){
            dispatch(fetchVideo(videoId))
        }
    },[dispatch, videoId,video])

    if(!video){
        return <div>Loading...</div>
    }
    const {title, description, userId, videoUrl, photoUrl} = video

    return (
        <div className="video-container">
            <video
                className="video-player"
                controls
                poster={photoUrl}
                src={videoUrl}
                type="video/mp4"
                autoPlay
            />
            <div className="video-content">
                <h4>{title}</h4>
                <div className="bottom-row">
                    <p>{description}</p>
                </div>
            </div>


        </div>
    )

}

export default VideoShowPage;
