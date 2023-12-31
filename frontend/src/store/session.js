import csrfFetch from "./csrf";

    // ACTION TYPES
    const SET_CURRENT_USER = 'session/setCurrentUser';
    const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

    // ACTION CREATORS
    export const setCurrentUser = user => ({
        type: SET_CURRENT_USER,
        payload: user
    });

    export const removeCurrentUser = () => ({
        type: REMOVE_CURRENT_USER
    });

    const storeCSRFToken = response => {
        const csrfToken = response.headers.get("X-CSRF-Token");
        if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
      }

      const storeCurrentUser = user => {
        if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
        else sessionStorage.removeItem("currentUser");
      }

    // THUNK ACTION CREATORS
    export const loginUser = ({ credential, password }) => async dispatch => {
        const response = await csrfFetch("/api/session", {
          method: "POST",
          body: JSON.stringify({ credential, password })
        });
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        // console.log(response)
        return response;
      };


      export const logoutUser = () => async (dispatch) => {
        const response = await csrfFetch("/api/session", {
          method: "DELETE"
        });
        storeCurrentUser(null);
        dispatch(removeCurrentUser());
        return response;
      };


    export const signUpUser = (user) => async (dispatch) => {
        const { username, email, password } = user;
        const response = await csrfFetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password
          })
        });
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        return response;
      };

      export const restoreSession = () => async dispatch => {
        const response = await csrfFetch("/api/session");
        storeCSRFToken(response);
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        return response;
      };

    // console.log(sessionStorage)
    const initialState = {
        user: JSON.parse(sessionStorage.getItem("currentUser"))
      };


    // REDUCER
    const sessionReducer = ( state = initialState, action ) => {
        const nextState = { ...state };

        switch(action.type) {
            case SET_CURRENT_USER:
                // debugger
                return {...nextState, user: action.payload}

            case REMOVE_CURRENT_USER:
                return { ...nextState, user: null };
            default:
                return state;
        }
    };

    export default sessionReducer
