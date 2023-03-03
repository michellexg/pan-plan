import React, { useState } from "react";
import Card from "react-bootstrap/esm/Card";
import { NavLink } from "react-router-dom";

function RecipeList(props) {
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
            <Card className="text-center" style={{ width: "18rem", height: "18rem" }}>
              <Card.Header>{recipe.name}</Card.Header>
              <Card.Body>
                <Card.Img variant="top" src={recipe.image_url} />
              </Card.Body>
              <Card.Footer className="text-muted">
                {recipe.creator.username}
                <NavLink to={`/recipes/${recipe.id}`}>
                  Details
                </NavLink>
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
