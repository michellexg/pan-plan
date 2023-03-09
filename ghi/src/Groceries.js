import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';
import Checkbox from './common/Checkbox';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



function GroceryList({ recipes }) {
    const [groceries, setGroceries] = useState([]);
    const [token] = useToken();

    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
    }

    let ourStorage = window.localStorage;

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
                    if (recipes_from_recipes.ok) {
                        const rec = await recipes_from_recipes.json();
                        rec.recipes.forEach((recipe) => {
                            if (recipeIds.includes(recipe.id)) {
                                for (let ingredient of recipe.ingredients.split('@#$')) {
                                    groceryItem.push(ingredient)
                                }
                            }
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

    groceries.map((grocery_li, idx) => ourStorage.setItem(grocery_li, false))

    console.log(localStorage)

    return (
        <>
            <Card className='groc-list container'>
            {/* <div className = "my-5 container groc-list modal-body"> */}
                <Card.Title>Groceries</Card.Title>
                <Card.Body>
                <ListGroup>
                    {groceries.map((grocery_li, idx) => {
                        return (
                            <ListGroup.Item className="px-3 mb-2 detail-list" >
                                <div key={idx}>
                                    <Checkbox label={grocery_li}></Checkbox>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}
export default GroceryList
