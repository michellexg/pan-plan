from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserOut,
    UserRepository,
    UserIn,
    UsersOut,
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


@router.get("/users", response_model=UsersOut)
def users_list(repo: UserRepository = Depends()):
    return {
        "users": repo.get_all_users(),
    }
