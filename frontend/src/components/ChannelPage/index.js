import nav from 'bootstrap';
import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import momo from './momo.png'
import "./ChannelPage.css"

const ChannelPage = ()=>{
    const currentUser = useSelector(state=>state.session.user);

    return (
        <>
            <div className="user-info">
                <img className="avatar" src={momo}></img>
                <h5>{currentUser.username}</h5>
            </div>

            <div>
                <ul className="nav nav-tabs user-prof-navbar">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Channels</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Favorites</a>
                    </li>
                </ul>
            </div>
        </>
    )

}

export default ChannelPage;
