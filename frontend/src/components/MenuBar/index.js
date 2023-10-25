import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import {button,  Navbar, Nav, NavItem} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import logo from './logo.png'
import './MenuBar.css'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';


function MenuBar() {
    const sessionUser = useSelector(state => state.session.user);
    const [show, setShow] = useState(false);

    const handleOpenModal = ()=>{
        setShow(true);
    }

    const handleCloseModal = ()=>{
        setShow(false);
    }

    return (
        <div className='menu-bar'>
            <div>
                <button type="button" className='btn menu-btn clickable'data-bs-toggle="offcanvas" data-bs-target="#side-bar">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="offcanvas offcanvas-start " tabIndex="-1" id="side-bar" >
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body" >
                        <a className="side-bar-home clickable" href="/">
                            <button className="side-bar-home-btn clickable" >
                                <i className="fa-solid fa-house side-bar-home-img"></i>
                                <span>Home</span>
                            </button>
                        </a>
                        <a className="side-bar-about clickable" >
                            <button className="side-bar-about-btn clickable" onClick={handleOpenModal}>
                                <i className="fa-solid fa-circle-question side-bar-about-img"></i>
                                <span>About</span>
                            </button>
                            <Modal show={show} onHide={handleCloseModal} backdrop="static" keyboard={false} >
                                <Modal.Header closeButton>
                                    <Modal.Title className="about-text">Welcome to FunTube!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="about-text">
                                        FunTube is a YouTube clone project, which is a video-sharing platform that allows users to discover
                                        and watch different kinds of videos covering different categories.
                                    </div>
                                    <br />
                                    <div className="about-text">
                                        <h5>Explore Current Features</h5>
                                        <li>Engage with content: Leave your comments, show appreciation through likes, and find all your favorite videos on your personalized 'Favorites' page.</li>
                                        <li>Personalized channels: Your channel showcases all your contributions, creating a unique space that represents your taste and interests.</li>
                                    </div>
                                    <br />
                                    <div className="about-text">
                                        <h5>Stay Tuned for What's Next</h5>
                                        <li>Video management: Upload and meticulously edit your videos, giving you full control over your content.</li>
                                        <li>Recommendations: Lists recommended videos on each video page, enhancing your browsing experience.</li>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary clickable" onClick={handleCloseModal}>
                                        OK
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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


    )
}


export default MenuBar;
