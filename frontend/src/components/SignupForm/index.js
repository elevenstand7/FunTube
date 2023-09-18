import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUpUser, loginUser, logoutUser  } from "../../store/session";
import './SignupForm.css';


const SignupForm = ()=>{

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isSignUp, setisSignUp] = useState(false);

    if(sessionUser) return <Redirect to="/" />;

    const handleSubmit = async e =>{
        e.preventDefault();

        setErrors([]);
        return dispatch(signUpUser({ email, username, password }))
          .catch(async (res) => {
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
      }
        // try{
        //     dispatch(signUpUser({ email, username, password }))
        //     setisSignUp(true)
        // }catch (res){
        //     let data;
        //     try {
        //       // .clone() essentially allows you to read the response body twice
        //       data = await res.clone().json();
        //     } catch {
        //       data = await res.text(); // Will hit this case if, e.g., server is down
        //     }
        //     if (data?.errors) setErrors(data.errors);
        //     else if (data) setErrors([data]);
        //     else setErrors([res.statusText]);
        //   };

    // if (sessionUser || isSignUp) {
    //     console.log(sessionUser)
    //     return <Redirect to="/" />; // Redirect to home page if signed in or signed up
    //   }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
                <label className="content">Username
                    <input type="text" onChange={e=>setUsername(e.target.value)} value={username} required></input>
                </label>
                <label className="content">Email
                    <input type="text" onChange={e=>setEmail(e.target.value)} value={email} required></input>
                </label>
                <label className="content">Password
                    <input type="password" onChange={e=>setPassword(e.target.value)} value={password} required></input>
                </label>
                <button type="submit" className="content btn">Sign Up</button>
            </form>
        </div>
    )

}

export default SignupForm;
