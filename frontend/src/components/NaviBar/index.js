import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import logo from './logo.png'
import './NaviBar.css';

function NaviBar() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  // const changeRoute = ()=>{
  //   history.push(`/login`);
  // }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <UserProfile user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      {/* {sessionUser? }
        <button onClick={changeRoute}>LogIn</button> */}
        <NavLink to="/login">LogIn</NavLink>
        <br />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        <i className="fa-solid fa-bars"></i>
        <img className="page-logo"src={logo}></img>
        <input type='text'></input>
        <br />
        {sessionLinks}
      </li>
    </ul>
  );
}

export default NaviBar;



