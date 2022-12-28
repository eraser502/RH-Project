import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getData, setData } from "../services/doc.services";

export const Login = () => {
  const navigate = useNavigate();

  const createDB = () => {
    if (getData("toDosDB") === null) {
      setData("toDosDB", []);
    }
  };

  return (
    <div className="loginContainer">
      <button className="loginButton" onClick={() => {createDB();navigate("/main")}}>
        Login
      </button>
    </div>
  );
};
