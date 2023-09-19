
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

//video selector
export const getVideo = videoId =>{
    return state =>{
        return state.videos? state.videos[videoId] : null
    }
}

export const getVideos = state =>{
    return state.videos? Object.values(state.videos) : []
}


//video thunk action

export const fetchVideos = () => async dispatch =>{
    const res = await fetch(`/api/videos`)
    if(res.ok){
        const videos = await res.json();
        dispatch(receiveVideos(videos));
        // return res;
    }
}

export const fetchVideo = (videoId) => async dispatch =>{
    const res = await fetch(`/api/videos/${videoId}`)
    if(res.ok){
        const video = await res.json();
        dispatch(receiveVideo(video));
        // return res;
    }
}
