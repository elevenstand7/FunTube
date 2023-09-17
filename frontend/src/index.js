import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router-dom";
// import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import { csrfFetch } from './store/csrf';
import { signUpUser, loginUser, logoutUser, restoreSession  } from './store/session';

const store = configureStore();


if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.csrfFetch = csrfFetch;
    window.signUpUser = signUpUser
    window.loginUser = loginUser
    window.logoutUser = logoutUser
}

function Root() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    );
  }
  // const root = ReactDOM.createRoot(document.getElementById("root"));

  const renderApplication = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  if (
    sessionStorage.getItem("currentUser") === null ||
    sessionStorage.getItem("X-CSRF-Token") === null
  ) {
    store.dispatch(restoreSession()).then(renderApplication);
  } else {
    renderApplication();
  }
