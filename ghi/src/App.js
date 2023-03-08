import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import RecipeList from "./RecipeList.js";
import "./App.css";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import CreateRecipeForm from "./common/CreateRecipeForm";
import DisplayRecipeDetails from "./common/RecipeDetails";
import SignupForm from "./SignupForm.js";
import MealCalendar from "./common/Calendar";
import MealList from "./MealList.js";
import GroceryList from "./Groceries";

function GetToken() {
  useToken();
  return null;
}

function App() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/recipes`;
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
    <div className="bg">
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <AuthProvider>
            <GetToken />
            <Nav />
            <Routes>
              <Route path="signup" element={<SignupForm />} />
              <Route path="/" element={<MealList recipes={recipes} />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="groceries" element={<GroceryList recipes={recipes} />} />
              <Route path="recipes/" element={<RecipeList fetchRecipes={fetchRecipes} recipes={recipes} />} />
              <Route path="recipes/new/" element={<CreateRecipeForm fetchRecipes={fetchRecipes} />} />
              {recipes.map((recipe) => (
                <Route
                  key={recipe.id}
                  path={`recipes/${recipe.id}`}
                  element={
                    <DisplayRecipeDetails
                      recipe={recipe}
                      fetchRecipes={fetchRecipes}
                    />
                  }
                />
              ))}
              <Route path="calendar" element={<MealCalendar recipes={recipes} />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
