import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink, useNavigate } from "react-router-dom";


function DisplayRecipeDetails(props) {
  const navigate = useNavigate()
  const [creatorID, setCreatorID] = useState([])
  const fetchToken = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const fetchConfig = {
        method: 'get',
        credentials: 'include',
      }
      const response = await fetch(url,fetchConfig)
      if (response.ok) {
        const data = await response.json()
        setCreatorID(data.account.id)
      }
    }

    useEffect(() => {
    fetchToken()
  }, [])

  const handleDelete = async (event) => {
    const value = event.target.value

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/${creatorID}/recipes/${value}`;
    const fetchConfig = {
      method: 'delete',
      credentials: 'include'
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      props.fetchRecipes()
      navigate('/recipes')
    }
  }
    const steps = props.recipe.steps
    const splitSteps = steps.split('@#$')
    const ingredients = props.recipe.ingredients
    const splitIngredients = ingredients.split('@#$')

  return (
    <Card style={{ width: '50%' }}>
      <Card.Img variant="top" src={props.recipe.image_url} style={{ width: '100%', height: '100%' }} />
      <Card.Body>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Card.Text>
            Created by: {props.recipe.creator.username}
            <span>   </span>
            {creatorID === props.recipe.creator.id ?
                    <button onClick={handleDelete} value={props.recipe.id}>
                      Delete
                    </button>
                  : <span></span>}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        Ingredients
        {splitIngredients.map((ingredient) => (
          <ListGroup.Item key={ingredient}>{ingredient}</ListGroup.Item>
        ))}
        Steps
        {splitSteps.map((step) => (
          <ListGroup.Item key={step}>{step}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <NavLink to="/recipes">Back to recipes</NavLink>
      </Card.Body>
    </Card>
  );
}


export default DisplayRecipeDetails
