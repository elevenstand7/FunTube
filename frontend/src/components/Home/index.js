import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

import NaviBar from "../NaviBar";

const Home = ()=>{
    const history = useHistory();
    const currentUser = useSelector(state=>state.session.user)
    const videos = useSelector(state => state.videos)
    // const userHasSignUp =
    // const routeChange1 = ()=>{history.push(`/signup`)}
    // const routeChange = ()=>{history.push(`/login`)}
    return (
        <div>
            <h2>Home page</h2>
            <NaviBar />
            {/* <a href="/signup">Sign Up</a> */}
            {/* <button onClick={routeChange1}>Sign Up</button> */}
            {/* <Link to={`/signup`} className="btn btn-primary">Sign Up</Link> */}
            {/* <button onClick={routeChange}>LogIn</button> */}

        </div>
    )

}


export default Home;
