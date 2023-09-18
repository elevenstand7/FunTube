import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';
import './SearchBar.css'



function SearchBar() {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
        <div className='search-bar'>
            <input type='text' defaultValue='Search' className='search-box'/>
            <button className='search-btn'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        </>
    )
}


export default SearchBar;
