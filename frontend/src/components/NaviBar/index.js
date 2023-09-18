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
      <UserProfile user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={changeRoute} type="button" className="user-btn btn btn-outline-primary ">
          <i className="fa-solid fa-user"></i>
          LogIn
        </button>
      </>
    );
  }

  return (
    <div>
        {sessionLinks}
    </div>
  );
}

export default NaviBar;



