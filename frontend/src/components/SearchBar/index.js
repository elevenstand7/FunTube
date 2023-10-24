import React, { useState }  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBar.css'
import { fetchVideosByTitle, clearSearchResults } from '../../store/search';



function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const handleSearch = e =>{
        e.preventDefault();
        const query = e.target.value;
        console.log("q", query)
        setSearchText(query);

        console.log("searchText",searchText)

        if (query.trim() !== "") {
            dispatch(fetchVideosByTitle(query));
            // history.push('/search-results');
            history.push(`/search?query=${query}`);
        }else{
            dispatch(clearSearchResults());
            history.push('/');
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (searchText.trim() !== '') {
          setSearchText('');
          history.push(`/search?query=${searchText}`);

        }else{
            dispatch(clearSearchResults());
            history.push('/');
        }
  }

    return (
        <>
        <div className='search-bar'>
            <input
                type='text'
                className='search-box'
                value={searchText}
                placeholder='Search by title'
                onChange={handleSearch}
            />
            <button className='search-btn' onClick={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        </>
    )
}


export default SearchBar;
