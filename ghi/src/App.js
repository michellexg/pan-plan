import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import SignupForm from "./SignupForm.js";
import Login from "./LoginForm";
import Nav from "./Nav.js"
import MainPage from "./MainPage";

function App() {
  return (
	<BrowserRouter>
    <Nav />
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
	</BrowserRouter>
  )
}

export default App;
