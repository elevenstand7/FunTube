import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";


function App() {
  return (
    <>
    <title>Funtube</title>
      <h1>Welcom to Funtube</h1>
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
        </Switch>

    </>
  );
}

export default App;
