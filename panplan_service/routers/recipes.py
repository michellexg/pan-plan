from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.recipes import (
    Error,
    RecipeOut,
    RecipeRepository,
    RecipeIn,
    RecipesOut,
)

router = APIRouter()

@router.post("/recipes", response_model=Union[RecipeOut, Error])
def create_recipe(
    recipe: RecipeIn,
    response: Response,
    repo: RecipeRepository = Depends(),
):
    # response.status_code = 400
    return repo.create_recipe(recipe)

@router.get("/recipes")#, response_model=Union[RecipesOut, Error])
def get_all_recipes(repo: RecipeRepository = Depends()):
    recipes = repo.get_recipes()
    return {"recipes": recipes}
