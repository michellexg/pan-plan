from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserOut,
    UserRepository,
    UserIn,
)

router = APIRouter()

@router.post("/users", response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
):
    # response.status_code = 400
    return repo.create_user(user)
