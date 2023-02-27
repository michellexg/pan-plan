import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
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
      {props.recipes
        .filter((val) => {
          if (searchName == "") {
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
                <a href={`/recipes/${recipe.id}`}>Details</a>
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
}

export default RecipeList;
