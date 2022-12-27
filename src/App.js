import "./App.css";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //라우팅

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path='/*' element={<Navigate to='login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
