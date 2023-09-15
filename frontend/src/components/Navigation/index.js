import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';


export default function Navigation() {
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


