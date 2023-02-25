import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider, useToken } from "./utils";
import './App.css';
import SignupForm from "./SignupForm.js";
import Login from "./LoginForm";
import Nav from "./Nav.js"
import MainPage from "./MainPage";

function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null
}

function App() {
  return (
	<BrowserRouter>
    <AuthProvider>
      <GetToken />
    <Nav />
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AuthProvider>
	</BrowserRouter>
  )
}

export default App;
