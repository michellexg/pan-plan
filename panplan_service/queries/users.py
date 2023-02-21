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

class UsersOut(BaseModel):
    users: list[UserOut]


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

    def delete(self, user_id: int) -> bool:
        try:
            #connect with database
            with pool.connection() as conn:
                #get a cursor
                with conn,cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, user_id: int, user: UserIn) -> Union[UserOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s
                          , password = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.password,
                            user_id
                        ]
                    )
                    # old_data = user.dict()
                    # return UserOut(id=user_id, **old_data)
                    return self.user_in_to_out(user_id, user)
        except Exception as e:
            print(e)
            return {"message": "Could not update that user"}
    def get_all_users(self) -> Union[Error, UsersOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, username
                        FROM users
                        ORDER BY id
                        """
                    )
                    results = []
                    for row in db.fetchall():
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results

        except Exception as e:
            print("Error is:", e)
            return {"message": "Could not get all users"}
