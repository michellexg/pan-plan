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


class RecipeOutWithName(BaseModel):
    id: int
    name: str


class MealOut(BaseModel):
    id: int
    date_int: int
    date: Optional[date]
    recipe_id: int
    account_id: int


class MealOutWithRecipeName(BaseModel):
    id: int
    date_int: int
    date: Optional[date]
    recipe_id: RecipeOutWithName
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

    def get_all(self):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        SELECT recipes.id as recipe_id, recipes.name
                        , meals.id as meal_id, meals.date_int
                        , meals.date, meals.account_id
                        FROM recipes
                        JOIN meals ON(recipes.id = meals.recipe_id)
                        ORDER BY recipes.id;
                        """
                    )

                    meals = []
                    rows = db.fetchall()
                    print("xxx", rows)
                    for row in rows:
                        meal = self.meal_record_to_dict(row, db.description)
                        print(meal)
                        meals.append(meal)
                    # print(meals)
                    return meals
        except Exception as e:
            print(e)
            return {"message": "Could not get all meals"}

    def meal_record_to_dict(self, row, description):
        meal = None
        print("what is description", description)
        if row is not None:
            meal = {}
            meal_fields = [
                "meal_id",
                "date_int",
                "date",
                "account_id",
            ]
            for i, column in enumerate(description):
                if column.name in meal_fields:
                    meal[column.name] = row[i]
            meal["id"] = meal["meal_id"]
            del meal["meal_id"]

            recipe = {}
            recipe_fields = [
                "recipe_id",
                "name",
            ]

            for i, column in enumerate(description):
                if column.name in recipe_fields:
                    recipe[column.name] = row[i]
            recipe["id"] = recipe["recipe_id"]
            del recipe["recipe_id"]

            meal["recipe_id"] = recipe
        return meal

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
