import React, { useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoListItem from "../VideoListItem";
import './SearchResults.css'

const SearchResults = ()=>{

    const videos = useSelector(state =>Object.values(state.videos.videos));
    return (
        <div className="video-list-container">

            {videos.map((video, index) =>(
                <div className="video-card" key={`${video.id}-${index}`}>
                    <VideoListItem className="video-pic" video={video}/>
                </div>
            ))}
        </div>
    )
}


export default SearchResults;
