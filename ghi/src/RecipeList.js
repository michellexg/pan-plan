import React, { useState, useEffect } from "react";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const fetchRecipes = async () => {
        const url = 'http://localhost:8000/recipes';
        const response = await fetch(url);

        if (response.ok){
            const data = await response.json
        }
    }

    return (
    <div className="Container">

    </div>
    );
}

export default RecipeList;
