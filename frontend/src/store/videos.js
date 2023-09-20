import csrfFetch from "./csrf.js";
//video actions
export const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS';
export const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
export const REMOVE_VIDEO = 'videos/REMOVE_VIDEO ';

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

// //video selector
// export const getVideo = videoId =>{
//     return state =>{
//         return state.videos? state.videos[videoId] : null
//     }
// }

export const getVideos = state =>{
    // console.log(state)
    if(state.videos){
        return Object.values(state.videos)
    }else{
        return []
    }
}


//video thunk action

export const fetchVideos = () => async dispatch =>{
    const res = await csrfFetch(`/api/videos`);
    // console.log(res);
    if(res.ok){
        const videos = await res.json();
        dispatch(receiveVideos(videos));
        return res;
    }
}

export const fetchVideo = (videoId) => async dispatch =>{
    const res = await csrfFetch(`/api/videos/${videoId}`)
    if(res.ok){
        const video = await res.json();
        dispatch(receiveVideo(video));
        // return res;
    }
}

function videosReducer(state={}, action){
    const nextState = {...state};
    switch(action.type){
        case RECEIVE_VIDEOS:
            return {...nextState, ...action.videos};
        case RECEIVE_VIDEO:
            nextState[action.video.id] = action.video;
            return nextState;
        case REMOVE_VIDEO:
            delete nextState[action.videoId]
            return nextState;
        default:
            return nextState;
    }

}

export default videosReducer;
