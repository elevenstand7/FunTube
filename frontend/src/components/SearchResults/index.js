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
    const noResults = searchResults.length === 1;
    const isLoading = useSelector((state) => state.search.isLoading);
    // console.log("query", query);
    // console.log("searchParams", searchParams);
    // console.log("searchResults", searchResults);
    // console.log("isLoading", isLoading);
    // console.log("noResults", noResults);

    useEffect(() => {
        // debugger
        if (query) {

            dispatch(fetchVideosByTitle(query));
        }
    }, []);

    // const videos = useSelector(state =>Object.values(state.videos.videos)) || null;
    return (
        <div className="video-list-container">
            {isLoading && <div>Loading...</div>}

            {!isLoading && noResults && <div>No results containing "{query}"</div>}


            {!isLoading && !noResults &&
            (searchResults.map((video, index) =>(
                <div className="video-card clickable" key={`${video.id}-${index}`}>
                    <VideoListItem className="video-pic" video={video}/>
                </div>
            )))}
        </div>
    )
}


export default SearchResults;
