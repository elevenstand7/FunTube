import React, { useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import VideoListItem from "../VideoListItem";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './SearchResults.css'
import { fetchVideosByTitle, clearSearchResults } from '../../store/search';

const SearchResults = ()=>{
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector((state) => Object.values(state.search));
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const noResults = searchResults.length === 0;

    console.log("searchResults", searchResults);
    console.log("query", query);

    useEffect(() => {
        debugger
        if (query) {

            dispatch(fetchVideosByTitle(query));
        }
    }, []);

    // const videos = useSelector(state =>Object.values(state.videos.videos)) || null;
    return (
        <div className="video-list-container">
            {noResults &&
                <div id='results-for'>No results containing "{query}"</div>
            }

            {searchResults.map((video, index) =>(
                <div className="video-card" key={`${video.id}-${index}`}>
                    <VideoListItem className="video-pic" video={video}/>
                </div>
            ))}
        </div>
    )
}


export default SearchResults;
