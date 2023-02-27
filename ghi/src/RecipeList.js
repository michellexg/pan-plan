import React, { useState } from "react";
import Card from "react-bootstrap/esm/Card";
import { NavLink } from "react-router-dom";

function RecipeList(props) {
  const [searchName, setSearchName] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search recipe by name"
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      />
      <div></div>
      <NavLink to="new">Create new recipe</NavLink>
      {props.recipes
        .filter((val) => {
          if (searchName === "") {
            return val;
          } else if (val.name.includes(searchName)) {
            return val;
          }
        })
        .map((recipe, key) => {
          return (
            <Card className="text-center" style={{ width: "18rem" }} key={key}>
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
          );
        })}
    </div>
  );
}

export default RecipeList;
