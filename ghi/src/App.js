import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Construct from './Construct.js'
//import ErrorNotification from "./ErrorNotification";
import RecipeList from "./RecipeList.js";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage";
import Login from "./LoginForm";
import DisplayRecipeDetails from "./common/RecipeDetails";
import SignupForm from "./SignupForm.js";
import MealList from "./MealList.js";
import { AuthProvider, useToken } from './Auth.js';

function GetToken() {
  useToken();
  return null
}

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);
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
        <div>
          <Routes>
            <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<MainPage />} />
            {recipes.map((recipe) => (
              <Route
                key={recipe.id}
                path={`recipes/${recipe.id}`}
                element={<DisplayRecipeDetails recipe={recipe} />}
              />
            ))}
            <Route path="/meals" element={<MealList />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
