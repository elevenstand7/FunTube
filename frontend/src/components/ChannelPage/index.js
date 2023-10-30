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
    const { userId } = useParams();
    console.log("userId", userId)
    const currentUser = useSelector(state=>state.session.user);
    const videos = useSelector(state=>Object.values(state.videos));
    // let currentUserVideos = null;
    // if (currentUser){
    //     currentUserVideos = videos.filter(video => video.userId === currentUser.id)
    // }
    const currentChannelVideos = videos.filter(video => video.userId == parseInt(userId))
    console.log("currentChannelVideos",currentChannelVideos)
    // console.log(currentUser)
    // console.log(videos)

    useEffect(()=>{
        dispatch(fetchVideos());
    },[dispatch])



    return (
        <>
        {currentUser?
        <div className='channel-container'>
            <UserProHeader userId={userId}/>
            <div>
                <ul className="nav nav-underline user-prof-navbar">
                    <li className="nav-item">
                        <Link className="nav-link active clickable" aria-current="true" to="/channel">CHANNELS</Link>
                    </li>
                    {currentUser.id ===  parseInt(userId)?
                    <li className="nav-item">
                        <Link className="nav-link clickable"  to="/favorites">FAVORITES</Link>
                    </li> : null}
                </ul>
            </div>
            <div className="user-fav-videos-container">
                {currentChannelVideos.length !==0? currentChannelVideos.map(video =>(
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
