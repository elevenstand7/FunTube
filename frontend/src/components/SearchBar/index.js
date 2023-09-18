import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';



function SearchBar() {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
        <div className='search-bar'>
            <input type='text' defaultValue='Search'/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        </>
    )
}


export default SearchBar;
