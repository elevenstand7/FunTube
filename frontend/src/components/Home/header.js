import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import MenuBar from "../MenuBar";
import SearchBar from "../SearchBar";
import NaviBar from "../NaviBar";
import UserProfile from "../UserProfile";

const Header = ()=>{
    const history = useHistory();
    // const currentUser = useSelector(state=>state.session.user)

    // const routeChange1 = ()=>{history.push(`/signup`)}
    // const routeChange = ()=>{history.push(`/login`)}
    return (
        <div className="header">
            <MenuBar />
            <SearchBar />
            <NaviBar />
        </div>
    )

}


export default Header;
