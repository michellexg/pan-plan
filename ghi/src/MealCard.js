import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';
import Card from "react-bootstrap/esm/Card"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MealCard({ date_int, recipes }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [recipe, setRecipe] = useState('');
    const [meals, setMeals] = useState([]);
    const [newMeal, setNewMeal] = useState('');
    const { token } = useToken()

    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
    }

    const dict = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday",
    }
    const day = dict[date_int];

    const handleRecipe = (event) => {
        const value = event.target.value;
        setRecipe(value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.account_id = accountId;
        data.date_int = date_int;
        data.recipe_id = parseInt(recipe);
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setNewMeal(recipe)
            setRecipe('');
        }
    }

    useEffect(() => {
        const getMeals = async () => {
            const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals`);
            if (response.ok) {
                const allMeals = await response.json();
                let meals = [];

                for (let meal of allMeals) {

                    if (meal.date_int === date_int && meal.account_id === accountId) {
                        meals.push(meal)
                    }
                }
                setMeals(meals);
            } else {
                console.error(response)
            }
        };
        getMeals();
    }, [newMeal, accountId, date_int])

    // return
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>{day}</Card.Title>
                {meals.map((meal) => {
                    return (
                        <Card.Text key={meal.id}>
                            {meal.recipe_id.name}
                        </Card.Text>
                    )
                })}
                <Button variant="primary" onClick={handleShow}>
                    Add a meal
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a meal!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <select
                                onChange={handleRecipe}
                                value={recipe}
                                required
                                type="text"
                                name="recipe"
                                id="recipe"
                                className="form-select">
                                <option >Choose a recipe</option>
                                {recipes.map(recipe => {
                                    return (
                                        <option key={recipe.id} value={recipe.id}>
                                            {recipe.name}
                                        </option>
                                    )
                                })}
                            </select>
                            <button className='btn btn-primary' onClick={handleClose}>
                                Save Changes
                            </button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={handleClose}>Cancel</button>

                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    )
}

export default MealCard
