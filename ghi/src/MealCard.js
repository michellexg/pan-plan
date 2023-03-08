import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';
import Card from "react-bootstrap/esm/Card"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink, Link } from 'react-router-dom';
import { Trash3 } from 'react-bootstrap-icons';


function MealCard({ date_int, recipes }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [recipe, setRecipe] = useState('');
    const [meals, setMeals] = useState([]);
    const [newMeal, setNewMeal] = useState('');
    const [token] = useToken();
    const [deleted, setDelete] = useState(false);

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

    async function handleDelete(id) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals/${id}`;
        const fetchConfig = {
            method: "DELETE",
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setDelete(true)
        } else {
            console.error(response)
        }
        return
    }


    useEffect(() => {
        const getMeals = async () => {
            if (accountId) {
                const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals/${accountId}`;
                const fetchConfig = {
                    credentials: 'include',
                }
                const response = await fetch(url, fetchConfig);
                if (response.ok) {
                    const allMeals = await response.json();
                    let meals = [];

                    for (let meal of allMeals) {

                        if (meal.date_int === date_int) {
                            meals.push(meal)
                        }
                    }
                    setMeals(meals);
                    setDelete(false);
                } else {
                    console.error(response)
                }
            }

        };
        getMeals();
    }, [newMeal, accountId, date_int, deleted])

    return (

        <Card className="text-center" style={{ width: '18rem', height: '20rem' }}>
            <Card.Body>
                <Card.Title>{day}</Card.Title>
                {meals.map((meal) => {
                    return (
                        <Card.Text key={meal.id}>
                            {/* <NavLink to={`/recipes/${meal.recipe_id.id}`}> */}
                            <Button className='btn-meal' href={`./recipes/${meal.recipe_id.id}`}>
                                {meal.recipe_id.name}
                            </Button>
                            {/* </NavLink> */}
                            {' '}
                            <Link onClick={() => handleDelete(meal.id)}>
                                <Trash3 size={15} color="red" />
                            </Link>
                        </Card.Text>
                    )
                })}
                {token ?
                    <Button className='btn-add-meal' onClick={handleShow}>
                        Add a meal
                    </Button> :
                    <Button className='btn btn-secondary' href="./login">Add a meal</Button>}

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
                            <Button className='btn-add-meal my-3' onClick={handleClose} type="submit">
                                Save Changes
                            </Button>
                            <Button className='btn btn-secondary m-3' onClick={handleClose}>Cancel</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card >
    )
}

export default MealCard
