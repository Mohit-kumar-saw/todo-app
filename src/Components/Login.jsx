import { Alert, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const nav = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    const user = {
      email: email,
      password: password,
      isLogin: isLogin,
      location:location
    };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(login());
    nav("/todo");
  };
  useEffect(() => {}, []);

  return (
    <div className="login-container">
    
      <div id="login">
      <img src="/pic.jpeg" alt="" />
      <div className="login">
      <h2>Login</h2>
        <TextField
          id="outlined-basic "
          className="login-input"
          label="Enter Your Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic "
          className="login-input"
          label="Enter Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic "
          className="login-input"
          label="Enter State Name(like: Mumbai, Delhi)"
          variant="outlined"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        {showAlert && (
          <Alert severity="error">Please Enter all the Fields.</Alert>
        )}
      </div>
      </div>
    </div>
  );
};

export default Login;
