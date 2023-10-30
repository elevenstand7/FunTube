import React, {useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import momo from '../momo.png';
import "./ChannelPage.css";
import { fetchUsers, fetchUser } from "../../store/users";


const UserProHeader = ({userId}) =>{
    console.log("userId", userId)
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);
    const user = useSelector(state=>state.users[userId])
    console.log("user", user)

    useEffect(()=>{
        dispatch(fetchUser(userId));
    },[dispatch])


    return (
        <>
        {user?
            <div className="userPro-info">
                <div >
                    <img className="userPro-avatar" src={momo}></img>
                </div>
               <div className="userPro-info-card">
                    <h5>{user.username}</h5>
                    <h5>{user.email}</h5>
               </div>
            </div>
            : <h3>Loading User</h3>
}

        </>
    )
}


export default UserProHeader;
