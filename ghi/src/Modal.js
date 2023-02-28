import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';


function UpdateMeal({ date_int }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState('');

    const getRecipes = async () => {
        const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/recipes`);
        if (response.ok) {
            const data = await response.json();
            const recipes = data.recipes;
            setRecipes(recipes)
        }
    }

    const handleRecipe = (event) => {
        const value = event.target.value;
        setRecipe(value)
    }

    useEffect(
        () => { getRecipes(); }, []
    )

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add a meal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a meal!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select onChange={handleRecipe} value={recipe} required type="text" name="recipe" id="recipe" className="form-select">
                        <option >Choose a recipe</option>
                        {recipes.map(recipe => {
                            return (
                                <option key={recipe.id} value={recipe.id}>
                                    {recipe.name}
                                </option>
                            )
                        })}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
//     if (!open) return null

//     return (
//         <div className='overlay'>
//             <div className="modalContainer">
//                 <ul>
//                     <li>1</li>
//                     <li>2</li>
//                     <li>3</li>
//                     <li>4</li>
//                 </ul>
//                 <div className="modalRight">
//                     <p onClick={onClose} className='closeBtn'>X</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default UpdateMeal
