import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { signUpUser, loginUser, logoutUser  } from '../../store/session';
import "./UserProfile.css"
import momo from '../momo.png'
import Dropdown from 'react-bootstrap/Dropdown';



function UserProfile({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const faviPage = e =>{
    e.preventDefault();
    const favoritesUrl = `/favorites`;

    window.open(favoritesUrl, '_blank');
  }

  const channelPage = e =>{
    history.push(`/${user.id}/channel`);
  }

  return (
    // <div className="user-profile-bar">
    //   <div className="avatar-btn">
    //     <button onClick={openMenu}>
    //       <i className="fa-solid fa-user-circle" />
    //     </button>
    //   </div>
    //   {showMenu && (
    //     <div className="profile-dropdown">
    //       <li>{user.username}</li>
    //       <li>{user.email}</li>
    //       <li>
    //         <button onClick={logout}>Log Out</button>
    //       </li>

    //     </div>
    //   )}
    // </div>
    <div className="user-profile-bar">
      <Dropdown>
        <Dropdown.Toggle id="avatar-btn" variant="success">
          <img className="profile-avatar" src={momo}></img>
        </Dropdown.Toggle>
        {/* {showMenu && ( */}
        <Dropdown.Menu>
          <Dropdown.Item as="div">{user.username}</Dropdown.Item>
          <Dropdown.Item as="div">{user.email}</Dropdown.Item>

          <Dropdown.Item as="div"  className="channel-btn clickable" onClick={channelPage}>
              <i className="fa-solid fa-user channel-img"></i>
              <span>Your channel</span>
            </Dropdown.Item>

            <Dropdown.Item as="div"  className="menu-favi-btn clickable" onClick={faviPage}>
              <i className="fa-regular fa-heart favi-img"></i>
              <span>Favorites</span>
            </Dropdown.Item>

            <Dropdown.Item as="div"  className="logout-btn clickable" onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket logout-img"></i>
              <span>Log Out</span>
            </Dropdown.Item>
            {/* <button onClick={logout} className="logout-btn">Log Out</button> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserProfile;

