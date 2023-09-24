import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import button from 'bootstrap';
import momo from './momo.png'
import { getVideo, fetchVideo} from "../../store/videos";
import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";

import "./VideoShowPage.css"

const VideoShowPage = ()=>{
    const dispatch = useDispatch();
    const { videoId } = useParams();
    // console.log("videoId", videoId)
    // debugger
    const currentUser = useSelector(state=>state.session.user);
    const currentUserId = currentUser.id;
    const video = useSelector(state => state.videos[videoId]);
    const likes = useSelector(state => Object.values(state.likes));
    // const userlikes = useSelector(state => Object.values(state.likes.userLikes));
    // const hasLiked = useSelector(state => hasLikedVideo(state, videoId, currentUser.id))
    // const likedVideos = useSelector(state => state.videos.likedVideos) || [];
    console.log(likes);
    useEffect(()=>{
        if(!video){
            dispatch(fetchVideo(videoId))
            dispatch(fetchLikes())
            dispatch(fetchUserLikes(currentUserId))
        }
    },[dispatch, videoId, currentUserId])

    if(!video){
        return <div>Loading...</div>
    }
    const {title, description, userId, videoUrl, uploader, photoUrl} = video

    const handleLike = e =>{
        e.preventDefault();
        console.log("click!")
        console.log(currentUser)
        console.log(userId)
    if (currentUser ){

        dispatch(createLike(videoId));
        // if (currentUser && currentUser.id !== userId){
        //     if(likedVideos.includes(videoId)){
        //         dispatch(unlikeVideo(videoId))
        //     }else{
        //         debugger
        //         dispatch(likeVideo(videoId))
        //     }
        // }else{
        //     console.log("You cannot like your video!")
        }
    }

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
                    <button className="favi-btn btn btn-light" onClick={handleLike}>
                        {/* <i className={ likedVideos.includes(videoId)? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> */}
                        <i className="fa-regular fa-heart"></i>
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
