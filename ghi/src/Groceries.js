import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';

function GroceryList({recipes}){
    console.log("Prop recipes",{recipes});

    const [groceries, setGroceries] = useState([]);
    const [token] = useToken();

    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
    }

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
                    const recipeIds = [];
                    allGroceries.forEach((meal) => {
                        recipeIds.push(meal.recipe_id.id);
                    })
                    const recUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/recipes`;
                    let recipes_from_recipes = await fetch(recUrl, fetchConfig);
                    console.log("recipes", recipes);
                    if(recipes_from_recipes.ok) {
                        const rec = await recipes_from_recipes.json();
                        console.log(rec) //log********
                        rec.recipes_from_recipes.forEach((recipe) => {
                            if(recipeIds.includes(recipes_from_recipes.id)) {
                                for (let ingredient of recipes_from_recipes.ingredients.split('@#$')){
                                        groceryItem.push(ingredient)
                                }
                            }
                            console.log(groceryItem)
                        });
                        setGroceries(groceryItem);
                    }
                } else {
                    console.error(response)
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
