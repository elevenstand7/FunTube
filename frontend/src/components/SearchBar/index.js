import React, { useState }  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBar.css'
import { fetchVideosByTitle } from '../../store/videos';



function SearchBar() {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const handleSearch = ()=>{
        dispatch(fetchVideosByTitle(title));

    }

    return (
        <>
        <div className='search-bar'>
            <input
                type='text'
                className='search-box'
                value={title}
                placeholder='Search by title'
                onChange={e => setTitle(e.target.value)}
            />
            <button className='search-btn' onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        </>
    )
}


export default SearchBar;
