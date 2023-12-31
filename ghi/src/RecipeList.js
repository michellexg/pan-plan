import { useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'


function RecipeList(props) {

  const [creatorID, setCreatorID] = useState([])
  const fetchToken = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`
    const fetchConfig = {
      method: 'get',
      credentials: 'include',
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const data = await response.json()
      if (data === null){
        setCreatorID([])
      } else {
      setCreatorID(data.account.id)
      }
    }
  }

  useEffect(() => {
    fetchToken()
  }, [])

  const handleDelete = async (event) => {
    const value = event.target.value

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/${creatorID}/recipes/${value}`
    const fetchConfig = {
      method: 'delete',
      credentials: 'include'
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      props.fetchRecipes()
    }
  }


  const [searchName, setSearchName] = useState("");
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <input
          type="text"
          placeholder="Search recipe by name"
          className="search-recipe"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <Link to="new/">
          <Button className="m-3 create-recipe">Create New Recipe</Button>
        </Link>
      </div>

      <div className="recipe-list">
        {props.recipes
          .filter((val) => {
            if (searchName === "") {
              return val;
            } else if (val.name.includes(searchName)) {
              return val;
            }
            return false;
          })
          .map((recipe, key) => {
            return (
              <Card className="recipe-card" key={key}>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Subtitle className="text-muted m-1">Creator: {recipe.creator.username}</Card.Subtitle>
                  <Card.Img variant="top" src={recipe.image_url} className="card-image" />
                </Card.Body>
                <Card.Footer>
                  <Nav.Item>
                    <Link to={`${recipe.id}`}>
                      <Button className="btn-add-meal">
                        Details
                      </Button>
                    </Link>
                    {creatorID === recipe.creator.id ?
                      <span>
                        <span> | </span>
                        <button onClick={handleDelete} value={recipe.id} className="btn btn-danger">
                          Delete
                        </button>
                      </span>
                      : <span></span>}

                  </Nav.Item>
                </Card.Footer>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default RecipeList;
