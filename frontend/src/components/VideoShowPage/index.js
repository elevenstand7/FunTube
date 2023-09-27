import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import button from 'bootstrap';
import momo from '../momo.png'
import { formatDateTime } from "../../util/dateUtil";
import { getVideo, fetchVideo} from "../../store/videos";
import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";
import VideosRecomList from "../VideosRecomList";
import { getVideoComments, fetchComments } from "../../store/comments";
import CreateCommentForm from "../CreateCommentForm";

import "./VideoShowPage.css"

const VideoShowPage = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { videoId } = useParams();


    const currentUser = useSelector(state=>state.session.user);

    const video = useSelector(state => state.videos[videoId]);
    // const likes = useSelector(state => Object.values(state.likes));
    // debugger
    const comments = useSelector(state => Object.values(state.comments));
    const userlikes = useSelector(state => state.likes.userLikes) || [];
    const likedVideoIds = userlikes.map(like => like.likedVideoId);
    // let isLiked = likedVideoIds.includes(parseInt(videoId));
    const isLiked = likedVideoIds.includes(parseInt(videoId));
    // const [isLiked, setIsLiked] = useState(initialLikeState);
    // debugger

    console.log("comments", comments)
    console.log("isLiked", isLiked);
    // console.log("userlikes", userlikes);
    // console.log("likedVideoIds", likedVideoIds);
    useEffect(()=>{
        // debugger
        if(!video){
            dispatch(fetchVideo(videoId))  
        }
        dispatch(getVideoComments(videoId))
    },[dispatch, videoId])

    // useEffect(() => {
    //     // debugger
    //     setIsLiked(initialLikeState);
    // }, [likedVideoIds]);

    useEffect(()=>{
        if(currentUser){
            dispatch(fetchUserLikes(currentUser.id))
        } 
    }, [dispatch, currentUser])


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
        <div>
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
                    <div className="video-description-container">
                        {description}
                    </div>
                </div>
            </div>

            {(currentUser && videoId) ?
                <CreateCommentForm videoId={videoId}/> : 
                <div>
                    <button onClick={()=> history.push('/login')}>Login to add a comment</button>
                </div>
            }
            <div className="comments-container">
                {/* <div>

                    <input type="text">Add a comment</input>
                    <button>Comment</button>
                </div> */}

            <h3>comments</h3>
                {comments.reverse().map(comment=>(
                    <div className="comment-content" key={comment.id}>
                        <div className="left-block">
                            <img className="comment-avatar" src={momo}></img>
                        </div>
                        <div className="right-block">
                            <div className="comment-top-row">
                                <div className="comment-author">@{comment.author}</div>
                                <div className="comment-createTime">{formatDateTime(comment.createdAt)}</div>
       
                            </div>
 
                            <div className="comment-body">{comment.body}</div>
                        </div>
                        

                    </div>
                ))}

            </div>
        </div>

        </div>
    )

}

export default VideoShowPage;
