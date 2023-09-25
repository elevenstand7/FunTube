import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import momo from '../momo.png';
import "./ChannelPage.css";


const UserProHeader = () =>{
    const currentUser = useSelector(state=>state.session.user);

    return (
        <>
            <div className="userPro-info">
                <div >
                    <img className="userPro-avatar" src={momo}></img>
                </div>
               <div className="userPro-info-card">
                    <h5>{currentUser.username}</h5>
                    <h5>{currentUser.email}</h5>
               </div>
            </div>


        </>
    )
}


export default UserProHeader;
