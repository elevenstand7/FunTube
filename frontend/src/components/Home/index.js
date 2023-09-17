import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

const Home = ()=>{
    const history = useHistory();
    const videos = useSelector(state => state.videos)
    const routeChange = ()=>{
        history.push(`/signup`)
    }
    return (
        <div>
            <h2>Video index page</h2>
            {/* <a href="/signup">Sign Up</a> */}
            <button onClick={routeChange}>Sign Up</button>
            {/* <Link to={`/signup`} className="btn btn-primary">Sign Up</Link> */}
        </div>
    )

}


export default Home;
