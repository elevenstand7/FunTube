import csrfFetch from "./csrf.js";
import { addUser, fetchUser } from "./users.js";


//video actions
export const ADD_VIDEO = 'videos/ADD_VIDEO';
export const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS';
export const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
export const REMOVE_VIDEO = 'videos/REMOVE_VIDEO ';
export const LIKE_VIDEO = 'videos/LIKE_VIDEO';
export const UNLIKE_VIDEO = 'videos/UNLIKE_VIDEO';
export const SEARCH_VIDEOS = 'videos/SEARCH_VIDEOS';
export const CLEAR_SEARCH_RESULTS = 'videos/CLEAR_SEARCH_RESULTS';

const addVideo = video => ({
    type: ADD_VIDEO,
    video
});

const receiveVideos = videos =>{
    return {
        type:RECEIVE_VIDEOS,
        videos
    }
}

const receiveVideo = video =>{
    return {
        type:RECEIVE_VIDEO,
        video
    }
}

const removeVideo = videoId =>{
    return {
        type:REMOVE_VIDEO,
        videoId
    }
}

const searchVideos = videos =>{
    return {
        type:SEARCH_VIDEOS,
        videos
    }
}

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});


//video thunk action

export const fetchVideos = () => async dispatch =>{
    const res = await csrfFetch(`/api/videos`);
    // console.log(res);
    if(res.ok){
        const {videos} = await res.json();
        // console.log(videos);
        // debugger
        dispatch(receiveVideos(videos));
        // return res;
    }
}

export const createVideo = ({title, description, thumbnail, videoObject})=> async (dispatch, getState) => {
    const {session} = getState();
    const res = await csrfFetch(`/api/videos`, {
        method: 'POST',
        body: JSON.stringify(
            {
                title: title,
                description: description,
                thumbnail: thumbnail,
                video: videoObject,
                user_id: session.user.id
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }

    });
    if (res.ok){
        const {video} = await res.json();
        dispatch(addVideo(video));
    }

}

export const fetchVideosByTitle = title => async dispatch =>{
    const res = await csrfFetch(`/api/videos?query=${title}`);
    if(res.ok){
        const {videos} = await res.json();
        // console.log("Fetched Videos:", videos);
        dispatch(searchVideos(videos));
        return res;
    }
}

export const fetchVideo = (videoId) => async dispatch =>{
    const res = await csrfFetch(`/api/videos/${videoId}`)
    // console.log(res)
    if(res.ok){
        const {video} = await res.json();
        // console.log("video:", video)
        if(video.id){
            dispatch(receiveVideo(video));
        }
        // return res;
    }
}


function videosReducer(state={}, action){
    const nextState = {...state};
    switch(action.type){
        case ADD_VIDEO:
            // debugger
            nextState[action.video.id] = action.video;
            return nextState;
        case RECEIVE_VIDEOS:
            // debugger
            return {...nextState, ...action.videos};
        case RECEIVE_VIDEO:
            nextState[action.video.id] = action.video;
            return nextState;
        case REMOVE_VIDEO:
            delete nextState[action.videoId]
            return nextState;

        case SEARCH_VIDEOS:
            return {...nextState, videos: action.videos}
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return nextState;
    }

}

export default videosReducer;
