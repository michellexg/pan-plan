from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.meals import (
    Error,
    MealIn,
    MealOut,
    MealRepository,
    MealOutWithRecipeName,
)

router = APIRouter()
from .auth import authenticator

@router.post("/meals", response_model=Union[MealOut, Error])
def create_meal(
    meal: MealIn,
    response: Response,
    repo: MealRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_meal(meal)


@router.get("/meals", response_model=Union[List[MealOutWithRecipeName], Error])
def get_all(
    repo: MealRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.get("/meals/{account_id}", response_model=Union[
    List[MealOutWithRecipeName], Error])
def get_account_meals(
    account_id: int,
    repo: MealRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_by_account_id(account_id)


@router.delete("/meals/{meal_id}", response_model=bool)
def delete_meal(
    meal_id: int,
    repo: MealRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_meal(meal_id)
