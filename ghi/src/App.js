import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Construct from './Construct.js'
//import ErrorNotification from "./ErrorNotification";
import "./App.css";
import RecipeList from "./RecipeList.js";

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
      console.log("ok response");
      const data = await response.json();
      const recipes = data.recipes;
      console.log(recipes);
      setRecipes(recipes);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
