import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";


function DisplayRecipeDetails(props) {
    const steps = props.recipe.steps
    const splitSteps = steps.split('@#$')
    const ingredients = props.recipe.ingredients
    const splitIngredients = ingredients.split('@#$')

    return (
    <Card style={{ width: '50%' }}>
      <Card.Img variant="top" center src={props.recipe.image_url} style={{ width: '100%', height: '100%' }} />
      <Card.Body>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Card.Text>
            Created by: {props.recipe.creator.username}
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
