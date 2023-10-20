import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoListItem from "../VideoListItem";
import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";
import { fetchVideo, fetchVideos, getVideos } from "../../store/videos";
import UserProHeader from "../ChannelPage/UserProHeader";
import './FavoritesPage.css';



const FavoritesPage = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state=>state.session.user);
    const videos = useSelector(state=>state.videos);
    const userlikes = useSelector(state => state.likes.userLikes) || [];
    const likedVideoIds = userlikes.map(like => like.likedVideoId);
    console.log("videos", videos);
    console.log("likedVideoIds", likedVideoIds);


    const currentUserLikedVideos = likedVideoIds.map(id => videos[id]).filter(Boolean);

    console.log("currentUserLikedVideos", currentUserLikedVideos);

    useEffect(()=>{
        // debugger

        if(currentUser){
            dispatch(fetchUserLikes(currentUser.id))
        }else{
            history.push('/login');
        };
        dispatch(fetchVideos());

    },[dispatch, currentUser, history])

    const faviPage = e =>{
        history.push(`/favorites`);
      }

    const channelPage = e =>{
    history.push(`/channel`);
    }

    return (
        <>
        {currentUser?
        <div className="favi-container">
                <UserProHeader />
                <div>
                    <ul className="nav nav-underline user-prof-navbar">
                        <li className="nav-item">
                            <a className="nav-link" onClick={channelPage}>CHANNELS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="true"  onClick={faviPage}>FAVORITES</a>
                        </li>
                    </ul>
                </div>
                <div className="user-fav-videos-container">
                    {currentUserLikedVideos.length !==0? currentUserLikedVideos.map(video =>(
                        // <h3>{video.title}</h3>
                        <div className="user-favi-video-card" key={video.id}>
                            <VideoListItem className="user-favi-video-pic" video={video}/>
                    </div>
                    )) : <p>Your favorite page is empty!</p>}

                </div>
            </div>
                : history.push('/login') }
        </>
    )
}


export default FavoritesPage;
