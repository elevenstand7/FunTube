import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/Home/header";

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

          {/* <Route path="/videos" >
          </Route> */}
        </Switch>

    </>
  );
}

export default App;
