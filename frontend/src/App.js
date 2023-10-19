import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import VideoShowPage from "./components/VideoShowPage";
import FavoritesPage from "./components/FavoritesPage";
import ChannelPage from "./components/ChannelPage";
import SearchResults from "./components/SearchResults";
import Header from "./components/Home/header";
import Footer from "./components/Home/footer";

function App() {
  return (
    <>
    {/* <title>Funtube</title>
      <h1>Welcom to Funtube</h1> */}
      <Header />
        <Switch>
        <Route exact path="/" >
            <Home />
          </Route>

          <Route path="/signup" >
            <SignupForm />
          </Route>

          <Route path="/login" >
            <LoginForm />
          </Route>

          <Route path="/videos/:videoId" >
            <VideoShowPage />
          </Route>

          <Route path="/favorites" >
            <FavoritesPage />
          </Route>

          <Route path="/channel" >
            <ChannelPage />
          </Route>

          <Route path="/search-results" >
            <SearchResults />
          </Route>
        </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
