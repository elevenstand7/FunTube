import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const VideoIndexPage = ()=>{
    const videos = useSelector(state => state.videos)


    return (
        <div>
            <h2>Video index page</h2>
        </div>
    )

}


export default VideoIndexPage;
