import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./VideosRecomList.css";
import UserProfile from "../UserProfile";
import VideoListItem from "../VideoListItem";
import { fetchVideo, fetchVideos, getVideos } from "../../store/videos";


const VideosRecomList = ({videoId})=>{
    // const history = useHistory();
    // const currentUser = useSelector(state=>state.session.user)
    // const dispatch = useDispatch();
    // const videos = useSelector(state=>state.videos);
    // const videos = useSelector(state=>Object.values(state.videos));

    // const recomList = videos.filter(video => video.id !== videoId);
    // console.log("recomList", recomList);
    // debugger
    // useEffect(()=>{
    //     // debugger
    //     dispatch(fetchVideos());

    // }, [dispatch])
    // return (
    //     <div className="video-list-container">

    //         {recomList.map((video, index) =>(
    //             <div className="video-card" key={`${video.id}-${index}`}>
    //                 <VideoListItem className="video-pic" video={video}/>
    //             </div>
    //         ))}
    //     </div>

    // )

}

export default VideosRecomList;
