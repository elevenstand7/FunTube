import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // debugger

    return dispatch(sessionActions.loginUser({ credential, password }))
      // .then(response => {
      //   console.log(response)
      // })
      .catch(async (res) => {
        console.log(res);
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label className="content">Username or Email
          <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required />
        </label>
        <label className="content">Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="content login-btn">Log In</button>
      </form>
      <Link to={`/signup`}>Create an Account!</Link>
    </div>
  );
}

export default LoginForm;
