import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';

function GroceryList({recipes}){

    const [recipe, setRecipe] = useState('');
    const [groceries, setGroceries] = useState([]);
    const [token] = useToken();

    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
    }

    var allGroceries;

    useEffect(() => {
        const getGroceries = async () => {
            if (accountId) {
                const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals/${accountId}`;
                var groceryItem = [];
                const fetchConfig = {
                    credentials: 'include',
                }
                const response = await fetch(url, fetchConfig);
                if (response.ok) {
                    const allGroceries = await response.json();
                    console.log("all groceries", allGroceries) //log********
                    const recipeIds = [];
                    allGroceries.forEach((meal) => {
                        recipeIds.push(meal.recipe_id.id);
                    })
                    const recUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/recipes`;
                    console.log(recUrl) //log********
                    recipes = await fetch(recUrl, fetchConfig);
                    console.log("recipes", recipes);
                    if(recipes.ok) {
                        const rec = await recipes.json();
                        console.log(rec) //log********
                        rec.recipes.forEach((recipe) => {
                            if(recipeIds.includes(recipe.id)) {
                                console.log("Including", recipe.ingredients.split('@#$')); //log********
                                var ingredients_list = (recipe.ingredients.split('@#$'));
                                for (let ingredient of recipe.ingredients.split('@#$')){
                                        groceryItem.push(ingredient)
                                }
                            }
                            console.log(groceryItem)
                        });
                        setGroceries(groceryItem);
                    }
                } else {
                    console.error(response) //log********
                }
            }

        };
        getGroceries();
    }, [accountId]);
    console.log("groceries",groceries) //log********
    return (
        <ul>
            {groceries.map((grocery_li) => {
                return (
                    <li className='groceryitem'>{grocery_li}</li>
                )
            })}
        </ul>
)
}
export default GroceryList
