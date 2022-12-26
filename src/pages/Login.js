import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  
  return (
    <div className="loginContainer">
      <button className="loginButton" onClick={() => navigate("/main")}>
        Login
      </button>
    </div>
  );
};
