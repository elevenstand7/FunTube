
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { signUpUser, loginUser, logoutUser  } from '../../store/session';
import "./UserProfile.css"
import Dropdown from 'react-bootstrap/Dropdown';



function UserProfile({ user }) {
  const dispatch = useDispatch();
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
          <i className="fa-solid fa-user-circle" />
        </Dropdown.Toggle>
        {/* {showMenu && ( */}
        <Dropdown.Menu>
          <Dropdown.Item >{user.username}</Dropdown.Item>
          <Dropdown.Item >{user.email}</Dropdown.Item>
          <Dropdown.Item >
            <a className="logout-btn" onClick={logout}>
              <i class="fa-solid fa-arrow-right-from-bracket logout-img"></i>
              <span>Log Out</span>
            </a>
            {/* <button onClick={logout} className="logout-btn">Log Out</button> */}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserProfile;

