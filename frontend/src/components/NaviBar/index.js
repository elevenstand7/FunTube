import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import './NaviBar.css';

function NaviBar() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const changeRoute = ()=>{
    history.push(`/login`);
  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='userContainer'>
        <i className="fa-solid fa-upload fa-lg"></i>
        <UserProfile user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <>
        <button onClick={changeRoute} type="button" className="user-btn btn btn-outline-primary clickable">
          <i className="fa-solid fa-user"></i>
          <div className='btn-content'>LogIn</div>
        </button>
      </>
    );
  }

  return (
    <div className='navi-btn'>
        {sessionLinks}
    </div>
  );
}

export default NaviBar;



