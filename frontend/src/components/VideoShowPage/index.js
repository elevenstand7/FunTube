import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import button from 'bootstrap';
import momo from '../momo.png'
import { getVideo, fetchVideo} from "../../store/videos";
import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";

import "./VideoShowPage.css"

const VideoShowPage = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { videoId } = useParams();


    const currentUser = useSelector(state=>state.session.user);
    // const currentUserId = currentUser.id || null;
    const video = useSelector(state => state.videos[videoId]);
    // const likes = useSelector(state => Object.values(state.likes));
    const userlikes = useSelector(state => state.likes.userLikes) || [];
    const likedVideoIds = userlikes.map(like => like.likedVideoId);
    // let isLiked = likedVideoIds.includes(parseInt(videoId));
    // const [likeState, setLikeState] = useState(isLiked)
    const [isLiked, setIsLiked] = useState(likedVideoIds.includes(parseInt(videoId)));

    // const hasLiked = useSelector(state => hasLikedVideo(state, videoId, currentUser.id))
    // const likedVideos = useSelector(state => state.videos.likedVideos) || [];
    console.log("isLiked", isLiked);
    console.log("userlikes", userlikes);
    console.log("likedVideoIds", likedVideoIds);
    useEffect(()=>{
        // debugger
        if(!video){
            dispatch(fetchVideo(videoId))
        }
        if(currentUser){
            dispatch(fetchUserLikes(currentUser.id))
        }


    },[dispatch, videoId, currentUser])

    useEffect(() => {
        // debugger
        setIsLiked(likedVideoIds.includes(parseInt(videoId)));
    }, [likedVideoIds, videoId]);


    if(!video){
        return <div>Loading...</div>
    }
    const {title, description, userId, videoUrl, uploader, photoUrl} = video

    const handleLike = async e => {
        e.preventDefault();
        console.log("click!")

        if (currentUser) {
            if (!isLiked) {

                await dispatch(createLike(videoId));
            } else {
                const matchedLike = userlikes.find(like => like.likedVideoId === parseInt(videoId) && like.userId === currentUser.id);
                if (matchedLike) {
                    await dispatch(deleteLike(matchedLike.id));
                }
            }
            dispatch(fetchUserLikes(currentUser.id));
        } else {
            history.push('/login');
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
                autoPlay
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
                        <i className={ isLiked? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        {/* <i className="fa-regular fa-heart"></i> */}
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
