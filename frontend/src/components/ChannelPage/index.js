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
    let currentUserVideos = null;
    if (currentUser){
        currentUserVideos = videos.filter(video => video.userId === currentUser.id)

    }else{
        history.push('/login')
    }

    // console.log(currentUserVideos)
    // console.log(currentUser)
    // console.log(videos)

    useEffect(()=>{
        if(currentUser){
            dispatch(fetchVideos());
    }else{
        history.push('/login')
    }

    },[dispatch, currentUser])

//   const faviPage = e =>{
//     history.push(`/favorites`);
//   }

//   const channelPage = e =>{
//     history.push(`/channel`);
//   }

    return (
        <>
        {currentUser?
        <div className='channel-container'>
            <UserProHeader />
            <div>
                <ul className="nav nav-underline user-prof-navbar">
                    <li className="nav-item">
                        <Link className="nav-link active clickable" aria-current="true" to="/channel">CHANNELS</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link clickable"  to="/favorites">FAVORITES</Link>
                    </li>
                </ul>
            </div>
            <div className="user-fav-videos-container">
                {currentUserVideos.length !==0? currentUserVideos.map(video =>(
                    // <h3>{video.title}</h3>
                    <div className="user-favi-video-card clickable" key={video.id}>
                        <VideoListItem className="user-favi-video-pic" video={video}/>
                </div>
                )) : <p>Your channel is empty!</p>}

            </div>
        </div>
            : history.push('/login')}
        </>
    )

}

export default ChannelPage;
