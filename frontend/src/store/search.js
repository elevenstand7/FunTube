import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});



export const fetchVideosByTitle = query => async dispatch =>{
    const res = await csrfFetch(`/api/videos/search?query=${query}`);
    if(res.ok){
        const {videos} = await res.json();
        debugger
        // console.log("Fetched Videos:", videos);
        dispatch(receiveSearchResults(videos));
        return res;
    }
}


const searchReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            debugger
            return {...action.searchResults};
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return newState;
    }
};

export default searchReducer;
