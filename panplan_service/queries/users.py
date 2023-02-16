from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str


class UserRepository:
    def create_user(self, user: UserIn) -> Union[UserOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username, password)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            user.password,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception:
            return {"message": "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
