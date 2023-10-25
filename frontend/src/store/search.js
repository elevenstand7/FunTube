import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';
export const SET_SEARCH_LOADING = 'search/setSearchLoading';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});
export const setSearchLoading = isLoading => ({
    type: SET_SEARCH_LOADING,
    isLoading
});



export const fetchVideosByTitle = query => async dispatch =>{
    dispatch(setSearchLoading(true));
    const res = await csrfFetch(`/api/videos/search?query=${query}`);
    if(res.ok){
        const {videos} = await res.json();
        // debugger
        // console.log("Fetched Videos:", videos);
        dispatch(receiveSearchResults(videos));
        dispatch(setSearchLoading(false));
        return res;
    }
}


const searchReducer = (state = { isLoading: false }, action) => {
    const newState = {...state}
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            // debugger
            return {...action.searchResults, isLoading: false };
        case CLEAR_SEARCH_RESULTS:
            return { isLoading: false };
        case SET_SEARCH_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return newState;
    }
};

export default searchReducer;
