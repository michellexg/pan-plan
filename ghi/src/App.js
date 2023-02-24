import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Nav from "./Nav"
import MainPage from "./MainPage";
import Login from "./LoginForm";
import DisplayRecipeDetails from './common/RecipeDetails';
import SignupForm from "./SignupForm.js";


function App() {
  const [accountInfo, setAccountInfo] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchAccountInfo = async () => {
    const url = 'http://localhost:8000/token'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
    }
  }

  const fetchRecipes = async () => {
    const url = 'http://localhost:8000/recipes'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setRecipes(data.recipes)
    }
  }

  useEffect(() => {
    fetchAccountInfo()
    fetchRecipes()
  }, [])

  console.log(recipes)

  return (
    <BrowserRouter>
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
    </BrowserRouter>

  );



            }
export default App;
