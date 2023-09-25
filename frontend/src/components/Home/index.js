import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import MenuBar from "../MenuBar";
import SearchBar from "../SearchBar";
import NaviBar from "../NaviBar";
import UserProfile from "../UserProfile";
import Header from "./header";
import VideoListItem from "../VideoListItem";
import { fetchVideo, fetchVideos, getVideos } from "../../store/videos";
// import VideosList from "../VideosList";



const Home = ()=>{
    // const history = useHistory();
    // const currentUser = useSelector(state=>state.session.user)
    const dispatch = useDispatch();

    const videos = useSelector(state=>Object.values(state.videos));

    // console.log(videos)
    // const video = videos[0];
    // const routeChange1 = ()=>{history.push(`/signup`)}
    // const routeChange = ()=>{history.push(`/login`)}

    useEffect(()=>{
        // debugger
        dispatch(fetchVideos());
    }, [dispatch])
    return (
        <div className="video-list-container">

            {videos.map((video, index) =>(
                <div className="video-card" key={`${video.id}-${index}`}>
                    <VideoListItem className="video-pic" video={video}/>
                </div>
            ))}
        </div>
        // <VideosList />
    )

}


export default Home;
