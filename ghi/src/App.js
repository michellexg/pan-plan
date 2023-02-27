import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useToken } from "./utils";
import './App.css'
import Nav from "./Nav"
import MainPage from "./MainPage";
import Login from "./LoginForm";
import DisplayRecipeDetails from './common/RecipeDetails';
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
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    const url = 'http://localhost:8000/recipes'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setRecipes(data.recipes)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])


  return (
    <BrowserRouter>
    <AuthProvider>
      <GetToken />
      <div className="container">
      <Nav />
        <Routes>
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
            {recipes.map(recipe => (
              <Route key={recipe.id} path={`recipes/${recipe.id}`} element={<DisplayRecipeDetails recipe={recipe} />} />
            ))}
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>

  );



            }
export default App;
