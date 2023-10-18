import nav from 'bootstrap';
import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProHeader from './UserProHeader';
import momo from '../momo.png'
import { fetchVideo, fetchVideos, getVideos } from "../../store/videos";
import VideoListItem from '../VideoListItem';
import "./ChannelPage.css"

const ChannelPage = ()=>{

    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state=>state.session.user);
    const videos = useSelector(state=>Object.values(state.videos));
    const currentUserVideos = videos.filter(video => video.userId === currentUser.id)
    console.log(currentUserVideos)
    console.log(currentUser)
    // console.log(videos)

    useEffect(()=>{
        dispatch(fetchVideos());
    },[dispatch])



    return (
        <>
            <UserProHeader />
            <div>
                <ul className="nav nav-underline user-prof-navbar">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="true" href="/channel">CHANNELS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="/favorites">FAVORITES</a>
                    </li>
                </ul>
            </div>
            <div className="user-fav-videos-container">
                {currentUserVideos.length !==0? currentUserVideos.map(video =>(
                    // <h3>{video.title}</h3>
                    <div className="user-favi-video-card" key={video.id}>
                        <VideoListItem className="user-favi-video-pic" video={video}/>
                </div>
                )) : <p>Your channel is empty!</p>}

            </div>
        </>
    )

}

export default ChannelPage;
