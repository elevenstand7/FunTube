import csrfFetch from "./csrf.js";
import { addUser, fetchUser } from "./users.js";


//video actions
export const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS';
export const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
export const REMOVE_VIDEO = 'videos/REMOVE_VIDEO ';
export const LIKE_VIDEO = 'videos/LIKE_VIDEO';
export const UNLIKE_VIDEO = 'videos/UNLIKE_VIDEO';
export const SEARCH_VIDEOS = 'videos/SEARCH_VIDEOS';


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

//video selector
// export const getVideo = videoId =>{
//     return state =>{
//         return state.videos? state.videos[videoId] : null
//     }
// }

// export const getVideos = state =>{
//     // console.log(state)
//     if(state.videos){
//         return Object.values(state.videos.videos)
//     }else{
//         return []
//     }
// }



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


// export const fetchVideosWithoutUrl= () => async dispatch =>{
//     const res = await csrfFetch(`/api/videos?excludeUrl=true`);
//     // console.log(res);
//     if(res.ok){
//         const {videos} = await res.json();
//         console.log(videos);
//         dispatch(receiveVideos(videos));
//         // return res;
//     }
// }

export const fetchVideosByTitle = title => async dispatch =>{
    const res = await csrfFetch(`/api/videos?query=${title}`);
    if(res.ok){
        const {videos} = await res.json();
        console.log("Fetched Videos:", videos);
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

// export const likeVideo = (videoId) => async (dispatch, getState) => {
//     const { session } = getState();
//     const res = await csrfFetch(`/api/videos/${videoId}/like`,{
//         method:'POST',
//         body: JSON.stringify({
//             user_like: true,
//             user_id:session.user.id,
//             video_id: videoId
//         })
//     });
//     if(res.ok){
//         const data = await res.json();
//         dispatch({
//             type: LIKE_VIDEO,
//             videoId
//         })
//         return data;
//     }
// }

// export const unlikeVideo = (videoId) => async dispatch => {
//     const res = await csrfFetch(`/api/videos/${videoId}/like`,{
//         method:'DELETE'
//     });
//     if(res.ok){
//         const data = await res.json();
//         dispatch({
//             type: UNLIKE_VIDEO,
//             videoId
//         })
//         return data;
//     }
// }

function videosReducer(state={}, action){
    const nextState = {...state};
    switch(action.type){
        case RECEIVE_VIDEOS:
            // debugger
            return {...nextState, ...action.videos};
        case RECEIVE_VIDEO:
            nextState[action.video.id] = action.video;
            return nextState;
        case REMOVE_VIDEO:
            delete nextState[action.videoId]
            return nextState;
        // case LIKE_VIDEO:
        //     return {...nextState, likedVideos: [...state.likedVideos, action.videoId]}
        // case UNLIKE_VIDEO:
        //     return {...nextState, likedVideos: nextState.likedVideos.filter(id => id !== action.videoId)}
        case SEARCH_VIDEOS:
            return {...nextState, videos: action.videos}
        default:
            return nextState;
    }

}

export default videosReducer;
