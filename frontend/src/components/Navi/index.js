import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navi.css';


export default function Navi() {
    const currentUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (currentUser) {
    //   sessionLinks = (
    //     <ProfileButton user={currentUser} />
    //   );
    } else {
      sessionLinks = (
        <>
          {/* <LoginFormModal /> */}
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      );
    }
    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {sessionLinks}
            </li>
        </ul>
    )
}


