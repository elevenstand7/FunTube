import nav from 'bootstrap';
import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProHeader from './UserProHeader';
import momo from '../momo.png'
import "./ChannelPage.css"

const ChannelPage = ()=>{
    const currentUser = useSelector(state=>state.session.user);

    return (
        <>
            <UserProHeader />
            <div>
                <ul className="nav nav-underline user-prof-navbar">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="true" href="/channel">CHANNELS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="/favorites">FAVORITES</a>
                    </li>
                </ul>
            </div>
        </>
    )

}

export default ChannelPage;
