from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import Union
from jwtdown_fastapi.authentication import Token
from .auth import authenticator
from queries.accounts import (
    Error,
    AccountOut,
    AccountRepository,
    AccountIn,
    AccountsOut,
    DuplicateAccountError
)
from pydantic import BaseModel


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/accounts", response_model=Union[AccountToken, Error])
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):

    hashed_password = authenticator.hash_password(info.password)
    # response.status_code = 400
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = AccountIn(username=info.username, password=info.password)

    token = await authenticator.login(response, request, form, repo)

    return AccountToken(account=account, **token.dict())


@router.get("/accounts/${id}", response_model=Union[AccountOut, Error])
def get_account(
    account_id: int,
    response: Response,
    queries: AccountRepository = Depends(),
):
    record = queries.get_account(account_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete(account_id)


@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update(account_id, account)


@router.get("/accounts", response_model=AccountsOut)
def accounts_list(repo: AccountRepository = Depends()):
    return {
        "accounts": repo.get_all_accounts(),
    }


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True
