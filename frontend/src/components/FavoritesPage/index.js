import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";
import { fetchVideo, fetchVideos, getVideos } from "../../store/videos";


const FavoritesPage = ()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);
    const videos = useSelector(state=>Object.values(state.videos));
    const userlikes = useSelector(state => state.likes.userLikes) || [];
    const likedVideoIds = userlikes.map(like => like.likedVideoId);
    console.log("userlikes", userlikes);

    useEffect(()=>{
        // debugger
        if(currentUser){
            dispatch(fetchUserLikes(currentUser.id))
        }

    },[dispatch, currentUser])

    return (
        <>
        <div>
            <h2>{currentUser.username}</h2>


        </div>

        </>
    )
}


export default FavoritesPage;
