import { useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


function RecipeList(props) {

  const [creatorID, setCreatorID] = useState([])
  const fetchToken = async () => {
      const url = 'http://localhost:8000/token'
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

    const url = `http://localhost:8000/${creatorID}/recipes/${value}`
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
    <div>
      <div style={{padding: "20px"}}>
      <input
        type="text"
        placeholder="Search recipe by name"
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      />
      </div>
      <NavLink to="new" style={{padding: "20px"}}>Create new recipe</NavLink>
      <div style={{padding: "20px"}}></div>

      <div className="container">
        <div className="row">
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
            <div className="col-3" key={key} style={{padding: "20px"}}>
            <Card className="text-center" style={{ width: "19rem", height: "19rem" }}>
              <Card.Header>{recipe.name}</Card.Header>
              <Card.Body>
                <Card.Img variant="top" src={recipe.image_url} style={{ width: "100%", height: "170px" }} />
              </Card.Body>
              <Card.Footer className="text-muted">
                {recipe.creator.username}
                <Nav.Item>
                  <NavLink to={`/recipes/${recipe.id}`}>
                    Details
                  </NavLink>
                  {creatorID === recipe.creator.id ?
                  <span>
                    <span> | </span>
                    <button onClick={handleDelete} value={recipe.id}>
                      Delete
                    </button>
                  </span>
                  : <span></span>}

                </Nav.Item>
              </Card.Footer>
            </Card>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
