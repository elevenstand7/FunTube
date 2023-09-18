import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import {button,  Navbar, Nav, NavItem} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import logo from './logo.png'
import './MenuBar.css'
// import bootstrap from 'bootstrap' ;


function MenuBar() {
    const sessionUser = useSelector(state => state.session.user);
    // const history = useHistory();
    // const changeRoute = ()=>{
    //     history.push(`/`);
    //   }

    return (
        <div className='menu-bar'>
            <div>
                <button type="button" className='btn menu-btn'data-bs-toggle="offcanvas" data-bs-target="#side-bar">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="side-bar">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body" >
                        <a className="side-bar-home" href="/">
                            <button className="side-bar-home-btn" >
                                <i className="fa-solid fa-house side-bar-home-img"></i>
                                <span>Home</span>
                            </button>

                        </a>
                    </div>
                </div>
                {/* {menuOpen? (<div className="menu">Open </div>) : null } */}
            </div>
            <div className='menu-logo'>
            <NavLink exact to="/">
                <img className="page-logo"src={logo}></img>
            </NavLink>
            </div>
        </div>

        // <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        // activeKey="/"
        // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        // >
        //     <div className="sidebar-sticky"></div>
        // <NavItem>
        //     <Nav.Link href="/home">Active</Nav.Link>
        // </NavItem>
        // </Nav>
    )
}


export default MenuBar;
