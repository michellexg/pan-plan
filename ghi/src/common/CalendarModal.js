import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


function AddRecipeModal(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [recipe, setRecipe] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {}
        data.date_int = 1
        data.date = props.date
        data.recipe_id = parseInt(recipe)
        data.account_id = props.accountId
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setRecipe('')
            props.fetchMeals()
        }

    }

    const handleRecipe = (event) => {
        const value = event.target.value;
        setRecipe(value)
    }

    return (
        <>
            {props.token ?
                <Button className='btn-add-meal' onClick={handleShow}>
                    Add a meal
                </Button> :
                <Link className='btn btn-secondary' to="login">Add a meal</Link>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a meal!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input readOnly value={props.date} className="form-control" name="date"/>
                        <label htmlFor="date">Date</label>
                        <select
                            onChange={handleRecipe}
                            value={recipe}
                            required
                            type="text"
                            name="recipe"
                            id="recipe"
                            className="form-select">
                            <option >Choose a recipe</option>
                            {props.recipes.map(recipe => {
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
        </>
    )
}

export default AddRecipeModal
