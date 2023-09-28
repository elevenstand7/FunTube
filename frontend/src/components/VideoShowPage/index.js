import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from 'video-react';
import button from 'bootstrap';
import momo from '../momo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import DeleteCommentModal from "./DeleteCommentModal";
import { formatDateTime } from "../../util/dateUtil";
import { getVideo, fetchVideo} from "../../store/videos";
import {createLike,deleteLike, hasLikedVideo, fetchLikes, fetchUserLikes} from "../../store/likes";
import VideosRecomList from "../VideosRecomList";
import { getVideoComments, fetchComments, destroyComment,createComment, updateVideoComment } from "../../store/comments";
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
    const [commentsUpdated, setCommentsUpdated] = useState(false);
    const [deleteCommentModal, setDeleteCommentModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [newCommentContent, setNewCommentContent] = useState("");   
    // debugger

    // console.log("comments", comments)
    // console.log("isLiked", isLiked);
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

    const onCommentChange = ()=>{
        setCommentsUpdated(!commentsUpdated);
    }

    const handleShow = (commentId)=> {
        setCommentToDelete(commentId);
        setDeleteCommentModal(true);
    }

    const handleDeleteComment = async()=>{


            if(commentToDelete){
                await dispatch(destroyComment(commentToDelete));
                setCommentToDelete(null);
                setDeleteCommentModal(false);
            }     
    }

    const handleEdit = (commentId)=>{
        // debugger
        const currentComment = comments.find(comment => comment.id === commentId);
        setNewCommentContent(currentComment.body);
        setEditingComment(commentId);
    }

    const handleCommentChange = (newContent) =>{
        // debugger

        setNewCommentContent(newContent);
    }

    const handleSaveEditComment = (commentId, body) =>{
        // debugger
        dispatch(updateVideoComment({id:commentId, body}))
        setEditingComment(null);
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
                    <CreateCommentForm videoId={videoId} onCommentChange={onCommentChange}/>
                    : 
                    <div>
                        <button onClick={()=> history.push('/login')} className="btn btn-outline-secondary add-comment-btn">Login to add a comment</button>
                    </div>
                }
                <div className="comments-container">

                    <h3>comments</h3>
                    {comments.reverse().map(comment=>(
                        <div className="comment-content" key={comment.id}>
                            <div className="comment-block">
                                <div className="left-block">
                                    <img className="comment-avatar" src={momo}></img>
                                </div>
                                <div className="middle-block">

                                    <div className="comment-top-row">
                                        <div className="comment-author">@{comment.author}</div>
                                        <div className="comment-createTime">{formatDateTime(comment.createdAt)}</div>
                                    </div>
                                    {editingComment === comment.id? (
                                        <div className="edit-comment-contain">
                                            <textarea 
                                                value={newCommentContent}
                                                onChange={e => handleCommentChange(e.target.value)}
                                                className="edit-text-box"
                                            />
                                            <button onClick={()=>handleSaveEditComment(comment.id, newCommentContent)} className="btn btn-outline-secondary edit-save-btn">Save</button>
                                        </div>

                                    ) : (
                                        <div className="comment-body">{comment.body}</div>
                                    )}
                                </div>
                            </div>
                            <div className="right-block">

                                {
                                currentUser && currentUser.id == comment.authorId  &&(
                                    <Dropdown>
                                        <Dropdown.Toggle className="modify-btn" variant="Secondary">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </Dropdown.Toggle>

                                        
                                        <Dropdown.Menu>
                                            <Dropdown.Item as="div"  className="edit-btn" onClick={()=>handleEdit(comment.id)}>
                                                <i className="fa-solid fa-pen edit-btn-img"></i>
                                                <span>Edit</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item as="div"  className="delete-btn" onClick={()=>handleShow(comment.id)}>
                                                <i className="fa-solid fa-trash delete-btn-img"></i>
                                                <span>Delete</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu> 
                                    </Dropdown>
                                )}


                            </div>

                        </div>
                    ))}

                </div>
            </div>
            
            <Modal 
                show={deleteCommentModal} 
                onHide={() => setDeleteCommentModal(false)} 
                className="delete-comment-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete your comment permanently?</Modal.Body>
                <Modal.Footer >
                    <button onClick={() => setDeleteCommentModal(false)} className="btn delete-modal-btn">Cancel</button>
                    <button onClick={handleDeleteComment} className="btn delete-modal-btn">Delete</button>
                </Modal.Footer>
            </Modal>


        </div>
    )

}

export default VideoShowPage;
