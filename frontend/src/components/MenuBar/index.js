import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';
import logo from './logo.png'
import './MenuBar.css'


function MenuBar() {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <div className='menu-bar'>
            <div className='menu-btn'>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className='menu-logo'>
            <NavLink exact to="/">
                <img className="page-logo"src={logo}></img>
            </NavLink>
            </div>
        </div>
    )
}


export default MenuBar;
