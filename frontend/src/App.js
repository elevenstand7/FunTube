import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import VideoIndexPage from "./components/VideoIndexPage";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <VideoIndexPage>
        <Switch>
            <Route path="/" >
            </Route>
        </Switch>
      </VideoIndexPage>
    </>
  );
}

export default App;
