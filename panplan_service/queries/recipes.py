from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool
from queries.users import UserOut

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

#Created new recipe out class including user dict, this method allows us to associated username with recipe easily
class RecipeOutWithUserDict(BaseModel):
    id: int
    name: str
    image_url: str
    ingredients: str
    steps: str
    creator: UserOut

class RecipesOut(BaseModel):
    recipes = list[RecipeOutWithUserDict]

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

    def recipe_record_to_dict(self, row, description):
        recipe = None
        if row is not None:
            recipe = {}
            recipe_fields = [
                "recipe_id",
                "name",
                "image_url",
                "ingredients",
                "steps",
            ]
            for i, column in enumerate(description):
                if column.name in recipe_fields:
                    recipe[column.name] = row[i]
            recipe["id"] = recipe["recipe_id"]
            del recipe["recipe_id"]

            creator = {}
            creator_fields = [
                "user_id",
                "username",
            ]
            for i, column in enumerate(description):
                if column.name in creator_fields:
                    creator[column.name] = row[i]
            creator["id"] = creator["user_id"]
            del creator["user_id"]
            recipe["creator"] = creator
        return recipe

    def get_recipes(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT users.id as user_id, users.username, recipes.id as recipe_id,
                        recipes.name, recipes.image_url, recipes.ingredients, recipes.steps
                        FROM users
                        JOIN recipes ON(users.id = recipes.creator_id)
                        ORDER BY users.id;
                        """
                    )
                    recipes = []
                    rows = db.fetchall()
                    for row in rows:
                        recipe = self.recipe_record_to_dict(row,db.description)
                        recipes.append(recipe)
                    return recipes

        except Exception as e:
            return {"message":"Could not get recipes :("}

    def get_one_recipe(self, recipe_id: int): # -> Optional[RecipeOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , image_url
                            , ingredients
                            , steps
                            , creator_id
                        FROM recipes
                        WHERE id = %s
                        """,
                        [recipe_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_recipe_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that recipe"}

    def record_to_recipe_out(self, record):
        return RecipeOut(
            id=record[0],
            name=record[1],
            image_url=record[2],
            ingredients=record[3],
            steps=record[4],
            creator_id=record[5]
        )
