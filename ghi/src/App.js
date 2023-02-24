import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import DisplayRecipeDetails from './common/RecipeDetails';



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

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
            {/*<Route path={`/recipes/${id}`} element={<DisplayRecipeDetails />} /> */}
            <Route path="/"/>
            {recipes.map(recipe => (
              <Route key={recipe.id} path={`recipes/${recipe.id}`} element={<DisplayRecipeDetails recipe={recipe} />} />
            ))}
        </Routes>
      </div>
    </BrowserRouter>

  );

}

export default App;
