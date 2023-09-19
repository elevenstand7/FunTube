import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import MenuBar from "../MenuBar";
import SearchBar from "../SearchBar";
import NaviBar from "../NaviBar";
import UserProfile from "../UserProfile";
import Header from "./header";

const Home = ()=>{
    const history = useHistory();
    const currentUser = useSelector(state=>state.session.user)
    // const videos = useSelector(state => state.videos)
    const videos = [];
    // const userHasSignUp =
    // const routeChange1 = ()=>{history.push(`/signup`)}
    // const routeChange = ()=>{history.push(`/login`)}
    return (
        <div >
            {videos.map(video=>{
                <div>video</div>
            })}

        </div>
    )

}


export default Home;
