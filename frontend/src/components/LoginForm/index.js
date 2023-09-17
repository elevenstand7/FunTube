import React, { useState } from "react";
import { signUpUser, loginUser, logoutUser  }  from "../../store/session";
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
  const [isLogin, setisLogin] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    try{
      dispatch(loginUser({ credential, password }));
      setisLogin(true);
    }catch(res){
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
      };
  };

  if (sessionUser || isLogin) {
    console.log(sessionUser)
    return <Redirect to="/" />; // Redirect to home page if signed in or signed up
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {/* <Link to={`/signup`}>Create an Account!</Link> */}
    </>
  );
}

export default LoginForm;
