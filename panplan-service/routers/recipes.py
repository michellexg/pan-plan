from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.recipes import (
    Error,
    RecipeOut,
    RecipeRepository,
    RecipeIn,
)
from .auth import authenticator

router = APIRouter()


@router.post("/recipes", response_model=Union[RecipeOut, Error])
def create_recipe(
    recipe: RecipeIn,
    response: Response,
    repo: RecipeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):

    return repo.create_recipe(recipe)


@router.get("/recipes/{id}")  # , response_model=Optional[RecipeOut])
def get_one_recipe(
    recipe_id: int,
    response: Response,
    repo: RecipeRepository = Depends(),
):
    recipe = repo.get_one_recipe(recipe_id)
    if recipe is None:
        response.status_code = 404
    return recipe


@router.get("/recipes")  # , response_model=Union[RecipesOut, Error])
def get_all_recipes(repo: RecipeRepository = Depends()):
    recipes = repo.get_recipes()
    return {"recipes": recipes}


@router.delete("/{user_id}/recipes/{recipe_id}", response_model=bool)
def delete_recipe(
    recipe_id: int,
    user_id: int,
    repo: RecipeRepository = Depends(),
) -> bool:
    return repo.delete_recipe(user_id, recipe_id)
