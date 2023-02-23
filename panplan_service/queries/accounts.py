from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class AccountIn(BaseModel):
    username: str
    password: str

class AccountOut(BaseModel):
    id: int
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountsOut(BaseModel):
    accounts: list[AccountOut]

class DuplicateAccountError(ValueError):
    pass

class AccountRepository:
    def create(self, account: AccountIn, hashed_password: str) -> Union[AccountOutWithPassword, Error]:
        # hashed_password = authenticator.hash_password(account.password)
        # print(hashed_password)
        # props = account.dict()
        # props["password"] = hashed_password
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (username, password)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            account.username,
                            hashed_password,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.account_in_to_out(id, account)
        except Exception:
            return {"message": "Create did not work"}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOutWithPassword(id=id, username=old_data["username"], hashed_password=old_data["password"])

    def get_account(self, id):
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (use to run SQL)
                with conn.cursor() as db:
                    # Run the select statement
                    db.execute(
                        """
                        SELECT id, username
                        FROM accounts
                        WHERE id = %s
                        """,
                        [id],
                    )
                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]

                    return record
        except Exception as e:
            print("Error is in get_account:", e)
            return {"message": "Could not get account"}

    def get_account_by_username(self, username):
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (use to run SQL)
                with conn.cursor() as db:
                    # Run the select statement
                    db.execute(
                        """
                        SELECT id, username, password
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]

                    return record
        except Exception as e:
            print("Error is in get_account:", e)
            return {"message": "Could not get account"}


    def delete(self, account_id: int) -> bool:
        try:
            #connect with database
            with pool.connection() as conn:
                #get a cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET username = %s
                          , password = %s
                        WHERE id = %s
                        """,
                        [
                            account.username,
                            account.password,
                            account_id
                        ]
                    )
                    # old_data = account.dict()
                    # return AccountOut(id=account_id, **old_data)
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update that account"}

    def get_all_accounts(self) -> Union[Error, AccountsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, username
                        FROM accounts
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
            print("Error is in get_all_accounts:", e)
            return {"message": "Could not get all accounts"}
