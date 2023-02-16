from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class RecipeIn(BaseModel):
    name: str
    image_url: str
    ingredients: str
    steps: str
    creator_id: int

class RecipeOut(BaseModel):
    id: int
    name: str
    image_url: str
    ingredients: str
    steps: str
    creator_id: int

class RecipeRepository:
    def create_recipe(self, recipe: RecipeIn) -> Union[RecipeOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO recipes
                            (name, image_url, ingredients, steps, creator_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            recipe.name,
                            recipe.image_url,
                            recipe.ingredients,
                            recipe.steps,
                            recipe.creator_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.recipe_in_to_out(id, recipe)
        except Exception:
            return {"message": "Create did not work"}

    def recipe_in_to_out(self, id: int, recipe: RecipeIn):
        old_data = recipe.dict()
        return RecipeOut(id=id, **old_data)
