import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import RecipeList from "./RecipeList.js";
import "./App.css";
import Nav from "./Nav";
import Login from "./LoginForm";
import CreateRecipeForm from './common/CreateRecipeForm';
import DisplayRecipeDetails from './common/RecipeDetails';
import SignupForm from "./SignupForm.js";
import MealList from './MealList.js';

function GetToken() {
  useToken();
  return null
}

function App() {

  const [recipes, setRecipes] = useState([]);
  const fetchRecipes = async () => {
    const url = "http://localhost:8000/recipes";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setRecipes(data.recipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);



  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <Routes>
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<MealList />} />
          <Route path="recipes/" element={<RecipeList recipes={recipes} />} />
          <Route path="recipes/new/" element={<CreateRecipeForm fetchRecipes={fetchRecipes} />} />
          {recipes.map((recipe) => (
            <Route
              key={recipe.id}
              path={`recipes/${recipe.id}`}
              element={<DisplayRecipeDetails recipe={recipe} />}
            />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
