from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class MealIn(BaseModel):
    date_int: int
    date: Optional[date]
    recipe_id: int
    account_id: int

class MealOut(BaseModel):
    id: int
    date_int: int
    date: Optional[date]
    recipe_id: int
    account_id: int

class MealRepository:
    def create_meal(self, meal: MealIn) -> Union[MealOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO meals
                            (date_int, date, recipe_id, account_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            meal.date_int,
                            meal.date,
                            meal.recipe_id,
                            meal.account_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.meal_in_to_out(id, meal)
        except Exception:
            return {"message": "Create did not work"}

    def meal_in_to_out(self, id: int, meal: MealIn):
        old_data = meal.dict()
        return MealOut(id=id, **old_data)

    def get_all(self) -> Union[Error, List[MealOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, date_int, date, recipe_id, account_id
                        FROM meals
                        ORDER BY id;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     meal = MealsOut(
                    #         id=record[0],
                    #         date_int=record[1],
                    #         date=record[2],
                    #         recipe_id=record[3],
                    #         account_id=record[4],
                    #     )
                    #     result.append(meal)
                    # return result

                    return [
                        self.record_to_meal_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all meals"}

    def get_by_account_id(self, account_id: int) -> Union[Error, List[MealOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, date_int, date, recipe_id, account_id
                        FROM meals
                        WHERE account_id = %s
                        ORDER BY date_int;
                        """,
                        [account_id]
                    )
                    # result = []
                    # for record in db:
                    #     meal = MealsOut(
                    #         id=record[0],
                    #         date_int=record[1],
                    #         date=record[2],
                    #         recipe_id=record[3],
                    #         account_id=record[4],
                    #     )
                    #     result.append(meal)
                    # return result

                    return [
                        self.record_to_meal_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get meals"}

    def delete_meal(self, meal_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM meals
                        WHERE id = %s
                        """,
                        [meal_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_meal_out(self, record):
        return MealOut(
            id=record[0],
            date_int=record[1],
            date=record[2],
            recipe_id=record[3],
            account_id=record[4],
        )
