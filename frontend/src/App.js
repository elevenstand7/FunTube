import React from "react";
import { Route, Switch } from "react-router-dom";
import Navi from "./components/Navi";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <>
      <h1>Welcom to Funtube</h1>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>

          <Route path="/signup" >
            <SignupForm />
          </Route>
        </Switch>

    </>
  );
}

export default App;
