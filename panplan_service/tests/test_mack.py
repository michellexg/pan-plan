from unittest import TestCase
# from fastapi import FastAPI
# from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountsOut

client = TestCase(app)


class EmptyAccountQuereies:
    def get_all_accounts(self):
        return []


def test_get_all_accounts():
    # Arrange
    app.dependency_overrides[AccountsOut] = EmptyAccountQuereies
    response = client.get("/accounts")
    # Act
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"accounts": []}
    # Assert




# from routers.auth import authenticator
# from main import app
# from queries.recipes import RecipesOut


# client = TestClient(app)

# recipe_list = RecipesOut(
#     recipes=[
#         {
#             "id": 1,
#             "name": "Awesomesauce",
#             "image_url": 'this image',
#             "ingredients": "a lot",
#             "steps": "many steps",
#             "creator": 1
#         }
#     ]
# )

# class MockList:
#     def get_all_recipes(self):
#         return recipe_list

# def test_get_all_recipes():
#     app.dependency_overrides[RecipesOut] = MockList
#     response = client.get('/recipes')
#     assert response.status_code == 200
#     assert response.json() == recipe_list

# app.dependecy_overrides = {}


# def test_init():
#     assert 1 == 0

# def test_two():
#     assert 1 == 1


# class UserOut(BaseModel):
#     username: str
#     roles: list[str]

# def fake_get_current_account_data():
#     return UserOut(username="Beowulf",
#                   email="beowulf@geats.com",
#                   roles=["hero"])

# def test_get_account():
#     # Arrange
#     app.dependency_overrides[authenticator.get_current_account_data] =
#       fake_get_current_account_data

#     # Act
#     response = client.get("/api/thing")

#     # Clean up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == ThingOut(thing=2)